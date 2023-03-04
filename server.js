//  Dependencies
const mysql = require("mysql2");
const inquirer = require("inquirer");
require("console.table");

// create mysql connection
const db = mysql.createConnection(
    {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'abc123!!',
        database: 'employees_db'
    },
    console.log('Connected to employees_db database.')
);

// connection prompt

db.connect(err => {
    if (err) throw err;
    console.log('Connection complete')
    employee_prompt();
})

// Initial user interaction

function employee_prompt() {
    inquirer.prompt({
        type: "list",
        name: "task",
        message: "Choose from the following options: ",
        choices: [
            "View Employees",
            "View Employees by Department",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "Add Role",
            "End"]
    })
    // Once the user choice has been selected, the selection choice calls the corresponding function to get the information that is needed
    .then(function (choice){
        switch (choice.questions) {
            case "View Employees":
                viewEmployees();
                break;
            case "View Employees by Department":
                viewEmployeesDepartment();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Remove Employee":
                removeEmployee();
                break;
            case "Update Employee Role":
                updateEmployee();
            case "Add Role":
                addRole();
                break;
            case "End":
                db.end();
                break;
        }
    })
};