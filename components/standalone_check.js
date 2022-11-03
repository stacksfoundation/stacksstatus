import * as fs from 'node:fs';
import * as path from 'node:path';
import fetch from "node-fetch";
import prisma from './../lib/db.js'

const status_dir = "status_checks"
const minutes = 1
const the_interval = minutes * 60 * 1000;

async function parse_file_data(file) {
    console.log("parse_data: " + file)
    fs.readFile(file, function (err, json) {
        if (err) throw err;
        const data = JSON.parse(json);
        if (data.disabled) {
            console.log("Skipping file: " + file)
            return;
        }
        if ( Array.isArray(data.query) ) {
            var query = data.query.join('\n');
        } else {
            var query = data.query
        }
        fetch_data(data.url, data.method, data.table, query)
    });
}

async function parse_fetch_data(table, json) {
    const tablename = JSON.stringify(table)
    var json_data = JSON.parse(json.toString());
    var multiple_keys = false
    let ts = new Date().toISOString();
    let keys = ["ts"]
    let values = ["'"+ts+"'"]
    for (var i=0; i < json_data.order.length; i++) {
        const key = json_data.order[i]
        const value = json_data.columns[key][0]
        // console.log("key:" + key)
        // console.log("value:" + value)
        keys.push(key)
        values.push("'"+value+"'")
        // console.log("using table:"+table+":")
        if ( json_data.columns[key].length > 1 ) {
            multiple_keys = true
            if (i+1 == json_data.order.length ){
                for (var j=0; j < json_data.columns[key].length; j++) {
                    let local_ts = new Date().toISOString();
                    let local_values = ["'"+local_ts+"'"]
                    local_values.push("'"+json_data.columns[json_data.order[i-1]][j]+"'")
                    local_values.push("'"+json_data.columns[json_data.order[i]][j]+"'")
                    console.log("Query: INSERT INTO public.table ("+keys+") VALUES ("+local_values+");")
                    const createrow = await prisma.$queryRawUnsafe(`INSERT INTO public.${table} (${keys}) VALUES (${local_values});`)
                }
            }
        }
    }
    if ( multiple_keys == false ){
        // console.log("Query: INSERT INTO public.table ("+keys+") VALUES ("+values+");")
        const createrow = await prisma.$queryRawUnsafe(`INSERT INTO public.${table} (${keys}) VALUES (${values});`)
    }
    console.log("********************************************")
}

async function fetch_data(url, method, table, query) {
    console.log("url: "+ url)
    console.log("method: "+ method)
    console.log("query: "+ query)
    fetch(url, {
        method: method,
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
        body: query
    }).then((response) => response.json())
        .then((json) => {
        console.log(json);
        let data = JSON.stringify(json);
        parse_fetch_data(table, data);
    })
        .catch((response) => {
        console.log("error fetching data from: " + url);
        console.error();
    });
}


async function read_dir() {    
    fs.readdir(status_dir, (err, files) => {
        if (err)
            console.log(err);
        else {
            files.forEach(file => {
                if (path.extname(file) == ".json")
                    console.log("Retrieving query from: "+status_dir + "/" + file)
                    parse_file_data(status_dir + "/" + file)
                })
        }
    })
}

// function freeze(time) {
//     const stop = new Date().getTime() + time;
//     while(new Date().getTime() < stop);       
// }

// setInterval(function() {
//     console.log("date: " + date_time);
//     console.log("sleeping...");
//     read_dir()
//         .catch((e) => {
//         throw e;
//     });
// }, the_interval);

read_dir()