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
        name: "selection",
        message: "Choose from the following options: ",
        choices: [
            "View All Employees",
            "View Employees by Department",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "Add Role",
            "End"]
    })
    // Once the user choice has been selected, the selection choice calls the corresponding function to get the information that is needed
    .then( answer => {
        switch (answer.selection) {
            case "View All Departments":
                viewAllDepartments();
                break;
            case "View All Roles":
                viewAllRoles();
                break;
            case "View All Employees":
                viewAllEmployees();
                break;
            case "Add a Department":
                addDepartment();
                break;
            case "Add Role":
                addRole();
            case "Add Employee":
                addEmployee();
                break;
            case "Update Employee Role":
                updateEmployeeRole();
                break;
            case "End":
                db.end();
                break;
        }
    })
};

// view all departments showing department name and id
function viewAllDepartments(){
    console.log('All Departments:\n')
    
    // sql query to get all columns from department table
    const sqlQuery = `SELECT * FROM department`;
    
    db.query(sqlQuery, (err, res) => {
        if (err) throw err;

        console.table(res);

        employee_prompt();
    })
}

// view all roles showing job title, role id, department the role belongs to and salary for that role
function viewAllRoles(){
    console.log('All roles:\n')

    // sql query to get all columns from roles table
    const sqlQuery = `SELECT * FROM roles`;

    db.query(sqlQuery, (err, res) => {
        if (err) throw err;

        console.table(res);

        employee_prompt();
    })

}

// view all employees returns back first name, last name, role, manager and department
function viewAllEmployees(){

    console.log('All Employee Information:\n')
    // sql query to get ALL employee information 'employee id, first name, last name, title, department, salary and manager'
    const sqlQuery = 
        `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager   
        FROM employee e 
        LEFT JOIN roles r 
            ON e.role_id = r.id 
        LEFT JOIN department d 
            ON d.id = r.department_id 
        LEFT JOIN employee m 
            ON m.id = e.manager_id`;
    
    db.query(sqlQuery, (err, res) => {
        if (err) throw err;

        console.table(res);

        employee_prompt();
    })
}

// add a new department to the department table
function addDepartment(){
    console.log('Add a new Department:\n')

    // inquirer prompt, questions to add new department
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Enter name of new department:\n"
        }
    ]).then(answer => {

        // query to add new department
        const sqlQuery = `INSERT INTO department (name) VALUES (?)`;
        const params = [answer.name];

        dbquery(sqlQuery, params, (err, res) => {
            if (err) throw err;
            console.log('New department added.');

            dbquery(`SELECT * FROM department`, (err, result) => {
                if (err) throw err;
                console.table(res);
                employee_prompt();
            })
        })

    })
}

function addEmployee(){
    console.log('Add a New Employee:\n')

    // inquirer prompt to answer questions about new employee
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'New hire first name: '
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'New hire last name: '   
        },
        {
            type: ''
        }
])
}

