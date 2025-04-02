import fs from 'node:fs'
import { parse } from 'csv-parse'
import { routes } from '../route.js';

const csvPath = new URL('../../Planilha sem título - Página1.csv', import.meta.url)

export function importCsv() {
    const method = 'POST'
    const url = '/tasks'

    const data = [];
    const stream = fs.createReadStream(csvPath)

    stream.pipe(
        parse({
            delimiter: ",",
            columns: true,
            ltrim: true,
        })
    )
        .on("data", (row) => {
            // This will push the object row into the array
            data.push(row);
        })
        .on("error", (error) => {
            console.log(error.message);
        })
        .on("end", () => {
            // Here log the result array
            const route = routes.find(route => {
                return route.method === method && route.path.test(url)
            })

            console.log("parsed csv data:");
            console.log(data);

            data.forEach(task => {
                console.log(JSON.stringify(task))
                console.log(`Title: ${task.title}, Description: ${task.description}`);

                const req = {
                    body: task
                }
                
                const res = {
                    writeHead: (statusCode) => {
                        console.log(`Status: ${statusCode}`);
                        return res; 
                    },
                    end: () => console.log("Resposta finalizada.")
                }

                route.handler(req, res)
            })
        });

}
