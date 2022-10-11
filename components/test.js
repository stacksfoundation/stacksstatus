import { PrismaClient } from "@prisma/client";
import fetch from "node-fetch";

const prisma = new PrismaClient();

async function parser(json) {
    // console.log(json)
    var data = JSON.parse(json.toString());
    var count = data.columns.count[0];
    // var value = data.columns.value[0];
    // var ts = data.columns.ts[0];
    // console.log("ts: " + ts)
    console.log("value: " + count);
    // store parsed in postgres
}
async function fetch_data() {
    // loop through json files in dir, parse and fill data vals below
    const query = "select count(tx_id) from mempool"; // this will come from the json file
    const url = "https://api.stacksdata.info/v1/sql"; // this will come from the json file
    fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
        body: query
    }).then((response) => response.json())
        .then((json) => {
        console.log(json);
        let data = JSON.stringify(json);
        parser(data);
    })
        .catch((response) => {
        console.log("error fetching data from: " + url);
        console.error();
    });
}
fetch_data()
    .catch((e) => {
    throw e;
})
    .finally(async () => {
    await prisma.$disconnect();
});