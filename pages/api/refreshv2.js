import * as fs from "fs";
import path from "path";
import fetch from "isomorphic-fetch";
import prisma from "../../lib/db";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const { authorization } = req.headers;
            if (authorization === `Bearer ${process.env.API_SECRET_KEY}`) {
                updateData();
                res.status(200).json({ success: true });
            } else {
                res.status(401).json({ success: false });
            }
        } catch (err) {
            res.status(500).json({ statusCode: 500, message: err.message });
        }
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
}

// main function that calls everything else
// gets fired off by the handler above on success
// optionally could be moved into the handler
async function updateData() {
    console.log("[updateData] starting");
    const statusDir = "status_checks";
    try {
        // get the array of json files
        const jsonFiles = await getFiles(statusDir);
        console.log(`[updateData] jsonFiles detected:`);
        console.log(jsonFiles);

        // loop through the array of json file names
        // and parse into an array of queries
        // returns values for success and failure
        const queries = await Promise.allSettled(
            jsonFiles.map((fileName) => parseFileData(statusDir, fileName))
        );
        const successfulQueries = [];
        for (const query of queries) {
            // log if unsuccessful
            if (query.status === "rejected") {
                console.log(`[updateData] rejected: ${query.reason}`);
                continue;
            }
            // show successful value and store for next step
            // console.log(query.value);
            successfulQueries.push(query.value);
        }

        // loop through the array of succesful queries
        // and fetch the related data
        // returns values for success and failure
        const fetchResults = await Promise.allSettled(
            successfulQueries.map((query) => fetchData(query))
        );
        const successfulFetches = [];
        for (const result of fetchResults) {
            // log if unsuccessful
            if (result.status === "rejected") {
                console.log(`[updateData] rejected: ${result.reason}`);
                continue;
            }
            // show successful value and store for next step
            // console.log(result.value);
            successfulFetches.push(result.value);
        }

        // loop through the array of succesful fetches
        // and parse the data then insert into the db
        // returns values for success and failure
        const dbResults = await Promise.allSettled(
            successfulFetches.map((result) => parseFetchData(result))
        );
    } catch (err) {
        console.log(`[updateData] err: ${err}`);
    }
}

//////////////////////////////////////////////////

// read the directory for a given path
// and return the file names in an array
async function getFiles(dir) {
    const statusDirPath = path.join(process.cwd(), dir);
    console.log(`[getFiles] in ${statusDirPath}`);
    // switched this to the synchronous version
    // gets an array of all file names in the directory
    const files = fs.readdirSync(statusDirPath);
    // filter out the non-json files
    const jsonFiles = files.filter((file) => path.extname(file) === ".json");
    // return the array of json files
    return jsonFiles;
}

// read the file data for a given file
// and return the data as a json object
async function parseFileData(dir, fileName) {
    console.log(`\n[parseFileData] ${fileName}`);
    // get the full path to the file
    const filePath = path.join(process.cwd(), dir, fileName);
    try {
        // read the file data
        const json = fs.readFileSync(filePath);
        const data = JSON.parse(json);
        // skip if disabled
        if (data.disabled)
            return new Promise((resolve, reject) => {
            reject(`[parseFileData] disabled ${data.table}`);
        });
        // reformat the query
        if (Array.isArray(data.query)) {
            data.query = data.query.join("\n");
        }
        // return the data
        return data;
    } catch (err) {
        if (err.code === "ENOENT") {
            return new Promise((resolve, reject) => {
                reject(`[parseFileData] File ${filePath} not found!`);
            });
        } else {
            return new Promise((resolve, reject) => {
                reject(`[parseFileData] Error parsing JSON file: ${err}`);
            });
        }
    }
}

// fetch JSON data for a given query
// from the stacksonchain API
// and return the data as a json object
async function fetchData(request) {
    try {
        // request contains .url .method .table .query
        const result = await fetch(request.url, {
            method: request.method,
            headers: {
                "Content-Type": "application/json",
            },
            body: request.query,
        });
        const json = await result.json();
        const data = JSON.stringify(json);
    
        console.log(`[fetchData] table (${request.table}) data:`);
        console.log(`[fetchData] ${data}`);
        // return the data
        return { table: request.table, data: data };
    } catch (err) {
        return new Promise((resolve, reject) => {
            reject(`[fetchData] Error fetching data: ${err}`);
        });
    }
}

// parse the JSON data for a given table
// and insert into the db
// and return the success or failure
async function parseFetchData(result) {
    // result contains .table .data
    const jsonData = JSON.parse(result.data.toString());
    console.log(`[parseFetchData] jsonData ${JSON.stringify(jsonData)}`);
    var multiple_keys = false
    const ts = new Date().toISOString();
    // set initial values
    const keys = ["ts"];
    const values = [`'${ts}'`];
    console.log(`[parseFetchData] jsonData order length ${jsonData.order.length}`);
    for (let i = 0; i < jsonData.order.length; i++) {
        const key = jsonData.order[i];
        const value = jsonData.columns[key][0];
        console.log(`[parseFetchData] key: ${key} value: ${value}`);
        keys.push(key);
        values.push(`'${value}'`);
        if ( jsonData.columns[key].length > 1 ) {
            multiple_keys = true
            if (i+1 == jsonData.order.length ){
                for (var j=0; j < jsonData.columns[key].length; j++) {
                    let local_ts = new Date().toISOString();
                    let local_values = [`${local_ts}`]
                    local_values.push(`${jsonData.columns[jsonData.order[i-1]][j]}`)
                    local_values.push(`${jsonData.columns[jsonData.order[i]][j]}`)
                    console.log("1 Query: INSERT INTO table ("+keys+") VALUES ("+local_values+");")
                    // const createrow = await prisma.$queryRawUnsafe(`INSERT INTO ${table} (${keys}) VALUES (${local_values});`)
                }
            }
        }
        if ( jsonData.columns[key].length > 1 ) {
            multiple_keys = true
            console.log("[parseFetchData] multiple keys")
        }
    }
    if ( multiple_keys === false ){
        console.log("2 Query: INSERT INTO table ("+keys+") VALUES ("+values+");")
        // const createrow = await prisma.$queryRawUnsafe(`INSERT INTO ${table} (${keys}) VALUES (${values});`)
    }
}