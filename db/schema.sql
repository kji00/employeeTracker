DROP DATABASE IF EXISTS employees_db;

-- Create new employee DB
CREATE DATABASE employees_db;

-- Use the employees DB
USE employees_db;

-- Creates department table
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100)
); 

-- Creates role table
CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NULL,
    salary DECIMAL NULL, 
    department_id INT NULL
);

-- Creates employee table
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NULL,
    last_name VARCHAR(100) NULL,
    role_id INT NULL,
    manager_id INT NULL 
);