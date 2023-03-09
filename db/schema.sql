DROP DATABASE IF EXISTS employees_db;

-- Create new employee DB
CREATE DATABASE employees_db;

-- Use the employees DB
USE employees_db;

-- Creates department table
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100),
    PRIMARY KEY(id)
); 

-- Creates role table
CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(100) NULL,
    salary DECIMAL NULL, 
    department_id INT NULL,
    PRIMARY KEY(id)
);

-- Creates employee table
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(100) NULL,
    last_name VARCHAR(100) NULL,
    role_id INT NULL,
    manager_id INT NULL,
    PRIMARY KEY(id) 
);