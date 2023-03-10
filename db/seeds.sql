-- Use employees db

USE employees_db;

-- Insert into tables

INSERT INTO department (name)
VALUES 
    ("Sales"), 
    ("Engineering"), 
    ("Finance"),
    ("Legal");

-- Insert employees into tables with roles, pay and department

INSERT INTO
    roles (title, salary, department_id)
VALUES 
    ("Sales Lead", 100000, 1),
    ("Lead Engineer", 150000, 2),
    ("Software Engineer", 120000, 2),
    ("Accountant", 125000, 3),
    ("Legal Team Lead", 250000, 4);

-- Insert employee information into the employee table
INSERT INTO
    employee (
        first_name,
        last_name,
        role_id,
        manager_id
    )
VALUES 
    ("Jane", "Doe", 1, 3),
    ("Mike", "Chan", 2, 1),
    ("Ashley", "Rodriguez", 3, 4),
    ("Kevin", "Tupik", 4, 3),
    ("Kunal", "Singh", 3, 4),
    ("Malia", "Brown", 2, 1),
    ("Sarah", "Lourd", 4, 7),
    ("Tom", "Allen", 1, 2);