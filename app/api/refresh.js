import * as fs from 'fs'
import path from 'path'
import fetch from 'isomorphic-fetch'
import prisma from '../../lib/db'
import { verifySignature } from '@upstash/qstash/nextjs'

async function handler (req, res) {
  if (req.method === 'POST') {
    try {
      await updateData()
      res.status(200).json({ success: true })
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

// main function that calls everything else
// gets fired off by the handler above on success
// optionally could be moved into the handler
async function updateData () {
  const statusDir = 'status_checks'
  try {
    // get the array of json files
    const jsonFiles = await getFiles(statusDir)

    // loop through the array of json file names
    // and parse into an array of queries
    // returns values for success and failure
    const queries = await Promise.allSettled(
      jsonFiles.map((fileName) => parseFileData(statusDir, fileName))
    )
    const successfulQueries = []
    for (const query of queries) {
      // log if unsuccessful
      if (query.status === 'rejected') {
        console.log(`[updateData] rejected: ${query.reason}`)
        continue
      }
      // show successful value and store for next step
      successfulQueries.push(query.value)
    }

    // loop through the array of succesful queries
    // and fetch the related data
    // returns values for success and failure
    const fetchResults = await Promise.allSettled(
      successfulQueries.map((query) => fetchData(query))
    )
    const successfulFetches = []
    for (const result of fetchResults) {
      // log if unsuccessful
      if (result.status === 'rejected') {
        continue
      }
      // show successful value and store for next step
      successfulFetches.push(result.value)
    }

    // loop through the array of succesful fetches
    // and parse the data then insert into the db
    // returns values for success and failure
    // const dbResults = await Promise.allSettled(
    await Promise.allSettled(
      successfulFetches.map((result) => parseFetchData(result))
    )
  } catch (err) {
    console.log(`err reading files in ${statusDir}: ${err}`)
  }
}

/// ///////////////////////////////////////////////

// read the directory for a given path
// and return the file names in an array
async function getFiles (dir) {
  const statusDirPath = path.join(process.cwd(), dir)
  // switched this to the synchronous version
  // gets an array of all file names in the directory
  const files = fs.readdirSync(statusDirPath)
  // filter out the non-json files
  const jsonFiles = files.filter((file) => path.extname(file) === '.json')
  // return the array of json files
  return jsonFiles
}

async function parseFileData (dir, fileName) {
  // get the full path to the file
  const filePath = path.join(process.cwd(), dir, fileName)
  try {
    // read the file data
    const json = fs.readFileSync(filePath)
    const data = JSON.parse(json)
    // skip if disabled
    if (data.disabled) {
      return new Promise((resolve, reject) => {
        reject(new Error(`[parseFileData] disabled ${data.table}`))
      })
    }
    // reformat the query
    if (Array.isArray(data.query)) {
      data.query = data.query.join('\n')
    }
    // return the data
    return data
  } catch (err) {
    if (err.code === 'ENOENT') {
      return new Promise((resolve, reject) => {
        reject(new Error(`[parseFileData] File ${filePath} not found!`))
      })
    } else {
      return new Promise((resolve, reject) => {
        reject(new Error(`[parseFileData] Error parsing JSON file: ${err}`))
      })
    }
  }
}

// fetch JSON data for a given query
// from the stacksonchain API
// and return the data as a json object
async function fetchData (request) {
  const RequestHeaders = {
    'Content-Type': 'application/json'
  }
  // add STACKSONCHAIN_JWT if it's defined
  if (process.env.STACKSONCHAIN_JWT) {
    RequestHeaders.Authorization = `Bearer ${process.env.STACKSONCHAIN_JWT}`
  }
  try {
    // request contains .url .method .table .query
    const result = await fetch(request.url, {
      method: request.method,
      headers: RequestHeaders,
      body: request.query
    })
    const json = await result.json()
    const data = JSON.stringify(json)

    // return the data
    return { table: request.table, data }
  } catch (err) {
    return new Promise((resolve, reject) => {
      reject(new Error(`[fetchData] Error fetching data: ${err}`))
    })
  }
}

// parse the JSON data for a given table
// and insert into the db
// and return the success or failure
async function parseFetchData (result) {
  // result contains .table .data
  const jsonData = JSON.parse(result.data.toString())
  // skip if returned query contains 'code' key (likely a 400 from the API)
  if (jsonData.code) {
    return
  }
  // set initial values
  const table = result.table.toString()
  const ts = new Date().toISOString()
  const keys = ['ts']
  const values = [`'${ts}'`]
  let multipleKeys = false
  for (let i = 0; i < jsonData.order.length; i++) {
    const key = jsonData.order[i]
    const value = jsonData.columns[key][0]
    keys.push(key)
    values.push(`'${value}'`)
    // if there are > 1 value for columns, switch bool for multipleKeys
    if (jsonData.columns[key].length > 1) {
      multipleKeys = true
      if ((i + 1) === jsonData.order.length) {
        // this is the last element of the order array
        for (let j = 0; j < jsonData.columns[key].length; j++) {
          // loop through the columns, storing the values of each key
          const localTs = new Date().toISOString()
          const localValues = [`'${localTs}'`]
          localValues.push(`'${jsonData.columns[jsonData.order[i - 1]][j]}'`)
          localValues.push(`'${jsonData.columns[jsonData.order[i]][j]}'`)
          // since each key should be it's own row in db, execute the sql to insert
          console.log(`INSERT INTO public.${table} (${keys}) VALUES (${localValues})`)
          try {
            await prisma.$queryRawUnsafe(`INSERT INTO public.${table} (${keys}) VALUES (${localValues});`)
          } catch (err) {
            // log an error if sql insert fails
            console.error(`SQL error: ${err} (INSERT INTO public.${table} (${keys}) VALUES (${localValues}))`)
          }
        }
      }
    }
  }
  if (multipleKeys === false) {
    // finally, execute the sql for "simple" queries of a single row insert
    console.log(`INSERT INTO public.${table} (${keys}) VALUES (${values})`)
    try {
      await prisma.$queryRawUnsafe(`INSERT INTO public.${table} (${keys}) VALUES (${values});`)
    } catch (err) {
      // log an error if sql insert fails
      console.error(`SQL error: ${err} (INSERT INTO public.${table} (${keys}) VALUES (${values}))`)
    }
  }
  return true
}

export default verifySignature(handler)

export const config = {
  api: {
    bodyParser: false
  }
}
