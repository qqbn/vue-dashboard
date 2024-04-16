const mysql = require('mysql2/promise');
require('dotenv').config();

const config = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT,

}

let connection;

const query = async (sql, params) => {
    if(!connection){
        connection = await mysql.createConnection(config);
    }

    const [rows, fields] = await connection.execute(sql, params);
    return rows;
}

module.exports={
    query
}