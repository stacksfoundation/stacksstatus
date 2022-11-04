import * as fs from 'fs';
import * as path from 'path';
import * as fetch from "isomorphic-fetch";
import prisma from '../../lib/db';

export default async function handler(req,res) {
  const status_dir = "status_checks"
  if (req.method === 'POST') {
    try {
      const { authorization } = req.headers;
      if (authorization === `Bearer ${process.env.API_SECRET_KEY}`) {
        async function parse_file_data(fileName) {
            const file = path.join(process.cwd(), fileName);
            try {
                var json = fs.readFileSync(file);
                const data = JSON.parse(json);
                if (data.disabled) {
                    // skip if disabled is true
                    return;
                }
                if ( Array.isArray(data.query) ) {
                    var query = data.query.join('\n');
                } else {
                    var query = data.query
                }
                fetch_data(data.url, data.method, data.table, query)
            } catch (e) {
                if (e.code === 'ENOENT') {
                    console.log("File (" + file + ")not found");
                } else {
                    console.log('Error:', e);
                }
            }
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
                            // console.log("[parse_fetch_data] Query: INSERT INTO table ("+keys+") VALUES ("+local_values+");")
                            const createrow = await prisma.$queryRawUnsafe(`INSERT INTO ${table} (${keys}) VALUES (${local_values});`)
                        }
                    }
                }
            }
            if ( multiple_keys == false ){
                // console.log("[parse_fetch_data] Query: INSERT INTO table ("+keys+") VALUES ("+values+");")
                const createrow = await prisma.$queryRawUnsafe(`INSERT INTO ${table} (${keys}) VALUES (${values});`)
            }
        }

        async function fetch_data(url, method, table, query) {
            try {
                const result = await fetch(url, {
                    method: method,
                    headers: {
                        'content-type': 'application/json;charset=UTF-8',
                    },
                    body: query,
                });
                const json = await result.json();
                const data = JSON.stringify(json);
                console.log("[fetch_data] table (" + table + ") data: " + data);
                await parse_fetch_data(table, data);
            } catch (error) {
                console.log("[fetch_data] error fetching data: " + error);
            }
        }

        async function read_dir() {  
            const status_dir_path = path.join(process.cwd(), status_dir);  
            fs.readdir(status_dir_path, (err, files) => {
                if (err)
                    console.log("error: " + err);
                else {
                    files.forEach(file => {
                        if (path.extname(file) == ".json")
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