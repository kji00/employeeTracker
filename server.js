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
            "View All Employees",
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
                viewAllEmployees();
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

// view all employees returns back first name, last name, role, manager and department
function viewAllEmployees(){

    console.log('All Employee Information\n')
    // sql query to get ALL employee information 'employee id, first name, last name, title, department, salary and manager'
    const sqlQuery = 
        `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager   
        FROM employee e 
        LEFT JOIN roles r 
            ON e.role_id = r.id 
        LEFT JOIN department d 
            ON d.id = r.department_id 
        LEFT JOIN employee m 
            ON m.id = e.manager_id`
    
    db.query(sqlQuery, function(err, res){
        if (err) throw err;

        console.table(res);

        employee_prompt();
    })
}

function viewEmployeesDepartment(){
    
    console.log('All Departments\n')

    const sqlQuery =
}

