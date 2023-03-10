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
                db.endSession();
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

            dbquery(`SELECT * FROM department`, (err, res) => {
                if (err) throw err;
                console.table(res);
                employee_prompt();
            })
        })

    })
}

// add new role to roles table
function addRole(){
    console.log('Add a new Role:\n')

    // inquirer prompt to add a new role (title, salary and department_id)
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "Enter the title of the new role"
        },
        {
            type: "input",
            name: "salary",
            message: "Enter salary amount"
        },
        {
            type: "number",
            name: "department_id",
            message: "Enter department id"
        }
    ]).then(answer => {
        // add new role query
        const sqlQuery = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`
        const params = [answer.title, answer.salary, answer.department_id]

        dbquery(sqlQuery, params, (err, res) => {
            if (err) throw err;
            console.log('New role added.');

            dbquery(`SELECT * FROM roles`, (err, res) => {
                if (err) throw err;
                console.table(res);
                employee_prompt();
            })
        })
    })
}

// add new employee to employee table
function addEmployee(){
    console.log('Add a New Employee:\n')

    // inquirer prompt to answer questions about new employee
    inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "New hire first name: "
        },
        {
            type: "input",
            name: "last_name",
            message: "New hire last name: "  
        },
        {
            type: "number",
            name: "role_id",
            message: "Enter role id:"
        },
        {
            type: "number",
            name: "manager_id",
            message: "Enter the manager\'s id"
        }
    ]).then(answer => {
        // add new employee query
        const sqlQuery = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`
        const params = [answer.first_name, answer.last_name, answer.role_id, answer.manager_id]

        dbquery(sqlQuery, params, (err, res) => {
            if (err) throw err;
            console.log('New employee added.');

            dbquery(`SELECT * FROM employee`, (err, res) => {
                if (err) throw err;
                console.table(res);
                employee_prompt();
            })
        })
    })
}

// update employee role
function updateEmployeeRole(){
    console.log('Update employee')

    db.query(`SELECT * FROM employee, roles`, (err, res) => {
        if (err) throw err;

        // inquirer prompt to choose which employee to update and role
        inquirer.prompt([
            {
                type: "list",
                name: "employee",
                message: "Choose which employee to update",
                choices: () => {
                    let empList = [];
                    for(let i = 0; i < res.length; i++){
                        empList.push(res[i].first_name);
                    }
                    let newEmpList = [...new Set(empList)]
                    return newEmpList;
                }
            },
            {
                type: "list",
                name: "role",
                message: "Choose employee's new role",
                choices: () => {
                    let roleList = [];
                    for(let i = 0; i < res.length; i++){
                        roleList.push(res[i].title); 
                    }
                    let newRoleList = [...new Set(roleList)];
                    return newRoleList;
                }
            }
        ]).then(answer => {
            for (let i = 0; i < res.length; i++) {
                if (res[i].first_name === answer.employee) {
                    let name = res[i];
                }
            }

            for (let i = 0; i < res.length; i++) {
                if (res[i].title === answer.role) {
                    let role = res[i];
                }
            }

            const sqlQuery = `UPDATE employee SET ? WHERE ?`
            const params = [{role_id: role}, {first_name: name}]

            dbquery(sqlQuery, params, (err, res) => {
                if (err) throw err;
                console.log('Employee has been added.');
                employee_prompt();
            })
        })
    })
}