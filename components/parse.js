import e from 'express';
import * as fs from 'node:fs';


async function parse_status_data(json) {
    var json_data = JSON.parse(json.toString());
    let ts = new Date().toISOString();
    let keys = ["ts"]
    let values = ["'"+ts+"'"]
    var multiple_keys = false
    for (var i=0; i < json_data.order.length; i++) {
        const key = json_data.order[i]
        const value = json_data.columns[key][0]
        console.log("key:" + key)
        console.log("value:" + value)
        console.log("multiple_keys:"+multiple_keys)
        keys.push(key)
        values.push("'"+value+"'")
        if ( json_data.columns[key].length > 1 ) {
            multiple_keys = true
            if (i+1 == json_data.order.length ){
                for (var j=0; j < json_data.columns[key].length; j++) {
                    let local_values = ["'"+ts+"'"]
                    local_values.push("'"+json_data.columns[json_data.order[i-1]][j]+"'")
                    local_values.push("'"+json_data.columns[json_data.order[i]][j]+"'")
                    console.log("Query: INSERT INTO public.table ("+keys+") VALUES ("+local_values+");")
                }
            }
        }
    }
    if ( multiple_keys == false ){
        console.log("keys:"+keys)
        console.log("values:"+values)
        console.log("Query: INSERT INTO public.table ("+keys+") VALUES ("+values+");")
        console.log("********************************************")
    }
}

async function fetch_data() {
    const status_file = "sample-mempool.json"
    // const status_file = "sample-contract.json"
    // const status_file = "sample-block.json"
    fs.readFile(status_file, function (err, data) {
        if (err) throw err;
        const file = JSON.parse(data);
        console.log(file)
        parse_status_data(data);
    });
}

fetch_data()
    .catch((e) => {
    throw e;
});