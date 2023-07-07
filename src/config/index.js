const mysql = require('mysql2')
const { Client} =require('pg')

// const makeMySQLConnection = require('./mysqlConnection');
// const mysqldbconnection = makeMySQLConnection({
//     mysql
// })

const makecockroachConnection = require('./cockroachConnection');
const cockroachdbconnection = makecockroachConnection({
    Client
})

const config = Object.freeze({
    cockroachdbconnection
})
console.log("CONECTIONNNNN:::",typeof(cockroachdbconnection),cockroachdbconnection)
module.exports = config;