import { Database } from "./database.js"
import { randomUUID } from 'crypto'
import { buildRoutePath } from "./utils/build-route-path.js"

const database = new Database()
//chama a database em uma constante para podermos operar em cima dela

export const routes = [
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { title, description } = req.body

            const task = {
                id: randomUUID(),
                title,
                description,
                completed_at: null,
                created_at: new Date(Date.now()),
                updated_at: null,
            }
            database.insert('tasks', task)
            return res.writeHead(201).end()
        }
    },
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {

            const task = database.select('tasks')
            return res.end(JSON.stringify(task))//exibe o httpie o retorno
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {

            const { id } = req.params

            database.delete('tasks', id)
            return res.writeHead(204).end()
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {

            const { title, description } = req.body
            const { id } = req.params

            const existingTask = database.get('tasks', id);

            if (!existingTask) {
                return res.writeHead(404).end(JSON.stringify({ message: 'Task not found' }));
            }

            const tasks = {
                ...existingTask,
                title : title,
                description : description,
                updated_at: new Date(Date.now())
            }


            database.edit('tasks', id, tasks)
            return res.writeHead(204).end()
        }
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: (req, res) => {

            const completed_at = new Date(Date.now())

            const { id } = req.params

            database.complete('tasks', id, completed_at)
            return res.writeHead(204).end()
        }
    }
]