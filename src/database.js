import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

export class Database {
    #database = {}

    constructor() {
        fs.readFile(databasePath, 'utf-8').then(data => {
            this.#database = JSON.parse(data)
        }).catch(() => {
            this.#persist()
        })
    } // ler do bd.json e popular o database

    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database, null, " "))
    }

    insert(table, data) {
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]
        }

        this.#persist();
        return data;
    }

    select(table) {
        return this.#database[table]
    }

    get(table, id){

        const rowIndex = this.#database[table].findIndex( row => row.id === id)

        return this.#database[table][rowIndex]
    }

    delete(table, id) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id)

        if (rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1)
            this.#persist()
        }
    }

    edit(table, id, data){
        const rowIndex = this.#database[table].findIndex( row => row.id === id)

        if(rowIndex > -1){
            this.#database[table][rowIndex] = {id, ...data}
            this.#persist()
        }
    }

    complete(table, id, completed_at){
        const rowIndex = this.#database[table].findIndex( row => row.id === id)

        if( rowIndex > -1){
            this.#database[table][rowIndex].completed_at = completed_at
            this.#persist()
        }
    }
}