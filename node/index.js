const express = require('express')
const app = express()
const port = 3000

const geradorDeNome = require('gerador-nome')

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const mysql = require('mysql')

function createTable(conn){
    const sql = `CREATE TABLE IF NOT EXISTS people(
                 id int NOT NULL AUTO_INCREMENT,
                 name varchar(255), 
                 primary key(id)
                 );`;
    
    conn.query(sql, (error, results, fields) => {
        if(error) return console.log(error);
    });
}

function insertPeople(conn, nome){
    let query = `INSERT INTO people(name) values ('${nome}')`
    conn.query(query)
    console.log(`Novo registro : ${nome}`);
}

app.get('/', (req, res) => {
    
    const connection = mysql.createConnection(config)

    let nome = geradorDeNome.geradorNome()
    insertPeople(connection, nome)

    const query = 'SELECT * FROM people'
    connection.query(query, function(err, rows) {
        if (err) throw err;
    
        let pagina = '<html><head><title>Full Cycle Rocks!</title></head><body><h1>Full Cycle Rocks!</h1><ol>'
        let lista = ''
        for (var i in rows) {
            lista += '<li>' + rows[i].name + '</li>'
        }

        pagina += lista
        pagina += '</ol></body></html>'

        res.send(pagina)
    });

    connection.end()
})

app.listen(port, () => {
    
    const connection = mysql.createConnection(config)  
    createTable(connection)
    connection.end()
    
    console.log(`Rodando na porta ${port}`)
})