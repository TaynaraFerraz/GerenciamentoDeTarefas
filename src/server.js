import http from 'node:http'
import { routes } from './route.js'
import { json } from './middleware/json.js'
import { importCsv } from './middleware/import-csv.js'

const server = http.createServer(async(req, res) => {
    const { method, url } = req

    //importCsv() basta chamar a função uma vez para pupolar automaticamente o db.json
    await json(req, res)

    const route = routes.find(route => {
       return route.method === method && route.path.test(url)
    })

    if(route){
        const routeParams = req.url.match(route.path) // routeParams contem varias propriedades como a rota completa, os grupos e outros

        const params = {...routeParams.groups} //captura os grupos {id, querys}
        req.params = params

        return route.handler(req, res)
    }

    return res.writeHead(404).end()
})

server.listen(3334)