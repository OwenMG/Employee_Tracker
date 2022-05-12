const inquirer = require("inquirer");
const mysql = require("mysql2");
const table = require("console.table");
// const Questions = require("./src/questions");

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

  // function addEmployee(firstName,lastName,role,manager){
  //   db.query("INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES (?,?,?,?)",
  //   firstName,lastName,role,manager, (err,result)=>{
  //     if (err){console.error("Query Error: "+err);}
  //     else {
  //       console.log("Successully added employee.");
  //       console.log(result);
  //     };
  //   });
  // };
