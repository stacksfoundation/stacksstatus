import * as fs from 'node:fs';
const status_file = "sample.json"
// const status_file = "sample2.json"
const check_file = "status_checks/current_mempool_size2.json"
// const check_file = "status_checks/current_mempool_size.json"

async function parse_fetch_data(json) {
    // console.log(json)
    if ( Array.isArray(json.data) ) {
        console.log("isarray")
        var data = json.data.join('\n');
    } else {
        console.log("NOT array")
        var data = json.data
    }
    console.log("query:"+data)
    console.log("********************************************")
}

async function parse_status_data(json) {
    // var data = JSON.parse(json.toString());
    // console.log(json)
    for (var i=0; i < json.order.length; i++) {
        const key = json.order[i]
        console.log("key:" + key)
        console.log("value:" + json.columns[key][0])
    }
    console.log("********************************************")
}

async function fetch_data() {
    fs.readFile(check_file, function (err, data) {
        if (err) throw err;
        const file = JSON.parse(data);
        console.log(file)
        parse_fetch_data(file);
    });
    fs.readFile(status_file, function (err, data) {
        if (err) throw err;
        const file = JSON.parse(data);
        console.log(file)
        parse_status_data(file);
    });
}

fetch_data()
    .catch((e) => {
    throw e;
});