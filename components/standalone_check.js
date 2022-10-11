import * as fs from 'node:fs';
import * as path from 'node:path';
import fetch from "node-fetch";

// const filename = "sample.json"
// const filename = "sample2.json"
// const filename = "status_checks/current_mempool_size.json"
const status_dir = "status_checks"
const minutes = 1
const the_interval = minutes * 60 * 1000;

async function parse_file_data(file) {
    console.log("parse_data: " + file)
    fs.readFile(file, function (err, json) {
        if (err) throw err;
        const data = JSON.parse(json);
        if ( Array.isArray(data.data) ) {
            var query = data.data.join('\n');
        } else {
            var query = data.data
        }
        fetch_data(data.url, data.method, query)
    });
}

async function parse_fetch_data(json) {
    var data = JSON.parse(json.toString());
    for (var i=0; i < data.order.length; i++) {
        const key = data.order[i]
        console.log("key:" + key)
        console.log("value:" + data.columns[key][0])
    }
}

async function fetch_data(url, method, data) {
    console.log("url: "+ url)
    console.log("method: "+ method)
    console.log("data: "+ data)
    fetch(url, {
        method: method,
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
        body: data
    }).then((response) => response.json())
        .then((json) => {
        console.log(json);
        let data = JSON.stringify(json);
        parse_fetch_data(data);
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
                // console.log(status_dir + "/" + file);
                parse_file_data(status_dir + "/" + file)
            })
    }
    })

}

setInterval(function() {
    console.log("I am doing my 5 minutes check");
    read_dir()
        .catch((e) => {
        throw e;
    });
}, the_interval);

