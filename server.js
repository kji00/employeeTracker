//  Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

// create mysql connection
const db = mysql.createConnection(
    {
        host: 'localhost',
        port: 3301,
        user: 'root',
        password: 'abc123!!',
        database: 'employees_db'
    },
    console.log('Connected to employees_db database.')
);

