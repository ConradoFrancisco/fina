const mysql = require('mysql')
const {promisify} = require('util')
const {database} = require('./keys')

const pool = mysql.createPool(database);

pool.getConnection((err,conn)=>{
    if(err){
        if (err === "PROTOCOL_CONNECTION LOST"){
            console.error("se cerro la conexion con la base de datos")
        }
        if(err === "ER_CON_COUNT_ERROR"){
            console.error("LA BASE DE DATOS TIENE MUCHAS CONEXIONES")
        }
        if (err === "ECONNREFUSED"){
            console.error("LA CONEXION FUE RECHAZADA")
        }
    }
    if(conn) conn.release();
    console.log("db conectada")
    return;
})

pool.query = promisify(pool.query)

module.exports = pool;