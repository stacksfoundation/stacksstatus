import * as fs from 'fs';
import * as path from 'path';
import * as fetch from "isomorphic-fetch";
import prisma from '../../lib/db';

export default async function handler(req,res) {
  const status_dir = "status_checks"
//   console.log("[handler] method:" + req.method)
  if (req.method === 'POST') {
    try {
      const { authorization } = req.headers;
      if (authorization === `Bearer ${process.env.API_SECRET_KEY}`) {
        async function parse_file_data(fileName) {
            const file = path.join(process.cwd(), fileName);
            // console.log("[parse_file_data] reading file: " + file)

            try {
                // console.log("[parse_file_data] reading file: " + file)
                // var fd = fs.openSync(file,"r");
                var json = fs.readFileSync(file);
                const data = JSON.parse(json);
                if (data.disabled) {
                    // console.log("[parse_file_data] skipping file: " + file)
                    // skip if disabled is true
                    return;
                }
                if ( Array.isArray(data.query) ) {
                    var query = data.query.join('\n');
                } else {
                    var query = data.query
                }
                // console.log("[parse_file_data] data.url"+ data.url)
                // console.log("[parse_file_data] data.method"+ data.method)
                // console.log("[parse_file_data] data.table"+ data.table)
                // console.log("[parse_file_data] data.query" + data.query)
                // console.log("[parse_file_data] calling fetch_data")
                fetch_data(data.url, data.method, data.table, query)
            } catch (e) {
                if (e.code === 'ENOENT') {
                    console.log("File (" + file + ")not found");
                } else {
                    // console.log("[parse_file_data] error reading file " + file)
                    console.log('Error:', e);
                }
            }
        }

        async function parse_fetch_data(table, json) {
            console.log("[parse_fetch_data] updating table: " + table)
            const tablename = JSON.stringify(table)
            var json_data = JSON.parse(json.toString());
            var multiple_keys = false
            let ts = new Date().toISOString();
            let keys = ["ts"]
            let values = ["'"+ts+"'"]
            for (var i=0; i < json_data.order.length; i++) {
                const key = json_data.order[i]
                const value = json_data.columns[key][0]
                keys.push(key)
                values.push("'"+value+"'")
                if ( json_data.columns[key].length > 1 ) {
                    multiple_keys = true
                    if (i+1 == json_data.order.length ){
                        for (var j=0; j < json_data.columns[key].length; j++) {
                            let local_ts = new Date().toISOString();
                            let local_values = ["'"+local_ts+"'"]
                            local_values.push("'"+json_data.columns[json_data.order[i-1]][j]+"'")
                            local_values.push("'"+json_data.columns[json_data.order[i]][j]+"'")
                            console.log("[parse_fetch_data] Query: INSERT INTO public.table ("+keys+") VALUES ("+local_values+");")
                            const createrow = await prisma.$queryRawUnsafe(`INSERT INTO public.${table} (${keys}) VALUES (${local_values});`)
                        }
                    }
                }
            }
            if ( multiple_keys == false ){
                console.log("[parse_fetch_data] Query: INSERT INTO public.table ("+keys+") VALUES ("+values+");")
                const createrow = await prisma.$queryRawUnsafe(`INSERT INTO public.${table} (${keys}) VALUES (${values});`)
            }
        }

        async function fetch_data(url, method, table, query) {
            // console.log("[fetch_data] fetching url: "+ url)
            // console.log("[fetch_data] fetching method: "+ method)
            // console.log("[fetch_data] fetching table: "+ table)
            // console.log("[fetch_data] fetching query: "+ query)
            try {
                const result = await fetch(url, {
                    method: method,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: query,
                });
                const json = await result.json();
                const data = JSON.stringify(json);
                console.log("[fetch_data] table (" + table + ") data: " + data);
                console.log("[fetch_data] calling parse_fetch_data");
                await parse_fetch_data(table, data);
            } catch (error) {
                console.log("[fetch_data] error fetching data: " + error);
            }
        }

        async function read_dir() {  
            const status_dir_path = path.join(process.cwd(), status_dir);  
            // console.log("[read_dir] status_dir_path: " + status_dir_path);
            fs.readdir(status_dir_path, (err, files) => {
                if (err)
                    console.log(err);
                else {
                    files.forEach(file => {
                        if (path.extname(file) == ".json")
                            // console.log("[read_dir] calling parse_file_data")
                            parse_file_data(status_dir + "/" + file)
                        })
                }
            })
        }

        read_dir()
            .catch((e) => {
            throw e;
        });
        res.status(200).json({ success: true });
      } else {
        res.status(401).json({ success: false });
      }
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}