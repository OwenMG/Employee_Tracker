const inquirer = require("inquirer");
const mysql = require("mysql2");
const table = require("console.table");
const Questions = require("questions.js");

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'localpass',
      database: 'employee_db'
    },
    console.log(`Connected to the employee database.`)
  );