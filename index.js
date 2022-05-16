const inquirer = require("inquirer");
const mysql = require("mysql2");
const Questions = require("./src/questions");

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

function runMenu() {
  inquirer
    .prompt(Questions.menu)
    .then((input) =>{
      console.log(input);
      if (input.menu_selection === "View all departments"){
        console.log("viewing departments...");
        viewTable("department");
      };
      if (input.menu_selection === "View all roles"){
        console.log("viewing roles...");
        viewTable("role");
      };
      if (input.menu_selection === "View all employees"){
        console.log("viewing all employees...");
        viewTable("employee");
      };
      if (input.menu_selection === "Add a department"){
        console.log("adding a department...");
        runMenu();
      };
      if (input.menu_selection === "Add a role"){
        console.log("adding a role...");
        runMenu();
      };
      if (input.menu_selection === "Add an employee"){
        console.log("adding an employee...");
        runMenu();
      };
      if (input.menu_selection === "Edit an employee role"){
        console.log("editing an employees role...");
        runMenu();
      };
      if (input.menu_selection === "Quit"){
        console.log("quitting...");
        process.exit();
      };
    })
};

function viewTable(table) {
  db.query(`SELECT * FROM ${table}`, (err, result) =>{
    if (err) {console.error(err)} else {
      console.table(result);
      runMenu();
    };
  });
};

runMenu();