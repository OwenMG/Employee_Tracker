const { restoreDefaultPrompts } = require("inquirer");
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
        addDept();
      };
      if (input.menu_selection === "Add a role"){
        console.log("adding a role...");
        addRole();
      };
      if (input.menu_selection === "Add an employee"){
        console.log("adding an employee...");
        addEmployee();
      };
      if (input.menu_selection === "Edit an employee"){
        console.log("editing an employee...");
        editEmployee();
      };
      if (input.menu_selection === "Quit"){
        console.log("Thanks for using Employee Tracker!");
        const sql = `SELECT employee.id, first_name, last_name, title, salary, dept_name, manager_id 
        FROM employee
        JOIN role ON employee.role_id=role.id
        JOIN department ON role.department_id=department.id;`;
        db.query(sql, (err,result)=> {
          if(err){console.error(err)}
          else{console.table(result)};
          process.exit();
        });
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

function addRole(){
  // getting current departments from database
  db.query(`SELECT * FROM department`, (err, result) =>{
    if (err){console.error(err)}else{
      const depts = result.map(({id, dept_name}) => ({name: dept_name, value: id}));

      // directing user to add a department first if there are none
      if (!depts[0]) {
        console.log("Please add at least one department first.")
        addDept();
      }
      else{
        // getting new role info
        inquirer
        .prompt([
          Questions.role.title,
          Questions.role.salary,
          {name: "role_dept",
            type: "list",
            choices: depts,}
        ])
        .then((answers) =>{
          // inserting new role into database
          const sql = `INSERT INTO role (title, salary, department_id) VALUES ("${answers.role_title}",${answers.role_salary},${answers.role_dept})`;
          console.log("query: "+ sql);
          db.query(sql, (err, result) => {
            if (err){console.error(err)}
            else{console.log("Role added successfully.")};
            runMenu();
          });
        });}
    };
  });
  
};

function addDept(){
  console.log("adding department...");
  inquirer
    .prompt(Questions.department)
    .then((answer) =>{
      const sql = `INSERT INTO department (dept_name) VALUES ("${answer.department_name}")`;
      db.query(sql, (err, result)=>{
        if (err){console.error(err)}
        else{console.log("Department added successfully.")};
        runMenu();
      });
    });
}

function addEmployee(){
  db.query(`SELECT * FROM role`, (err,result)=>{
    if(err){console.error(err)}else{
      const roles = result.map(({id, title})=>({name: title, value: id}));
      // directing user to add a role first if there are none
      if(!roles[0]){
        console.log("Please add at least one role first.");
        addRole();
      }
      else{
        db.query(`SELECT * FROM employee`, (err,result)=>{
        if(err){console.error(err)}else{
         let employees = result.map(({id, first_name, last_name})=>({name:`${first_name} ${last_name}`, value: id}));
         if (!employees[0]){
           employees.unshift({name: "*Self*", value: 1});
         }
          inquirer
            .prompt([
              Questions.employee.firstname,
              Questions.employee.lastname,
              {name: "employee_role",
                type: "list",
                message: "Please choose the employee's role",
                choices: roles},
              {name: "employee_manager",
                type: "list",
                message: `Please choose the employee's manager.`,
                choices: employees}
            ])
            .then((answers) =>{
              console.log(answers);
              const sql =  `INSERT INTO employee (first_name, last_name, role_id, manager_id) 
              VALUES ("${answers.employee_first}", "${answers.employee_last}", ${answers.employee_role}, ${answers.employee_manager})`;
              db.query(sql, (err,result)=>{
                if(err){console.error(err)}
                else{console.log("Employee added successfully.")};
                runMenu();
              });
              
            });
        };
      });
      
    };}
      
  });
}

function editEmployee() {
  // Get all employees and have user pick one to edit
  db.query(`SELECT * FROM employee`, (err,result)=>{
    if(err){console.error(err)}else{
      let employees = result.map(({id, first_name, last_name})=>({name:`${first_name} ${last_name}`, value: id}));
      if(!employees[0]){
        console.log("Please add at least one employee first.");
        addEmployee();
      }else{
        inquirer
          .prompt([
            {
              name: "id",
              type: "list",
              message: "Please choose an employee to edit",
              choices: employees
            }
          ])
          .then((choice)=>{
            const empId = choice.id;
            // pasted from addEmployee, sets role and manager
            db.query(`SELECT * FROM role`, (err,result)=>{
              if(err){console.error(err)}else{
                const roles = result.map(({id, title})=>({name: title, value: id}));
                // directing user to add a role first if there are none
                if(!roles[0]){
                  console.log("Please add at least one role first.");
                  addRole();
                }
                else{
                  db.query(`SELECT * FROM employee`, (err,result)=>{
                  if(err){console.error(err)}else{
                   let employees = result.map(({id, first_name, last_name})=>({name:`${first_name} ${last_name}`, value: id}));
                   if (!employees[0]){
                     employees.unshift({name: "*Self*", value: 1});
                   }
                    inquirer
                      .prompt([
                        {name: "employee_role",
                          type: "list",
                          message: "Please choose the employee's role",
                          choices: roles},
                        {name: "employee_manager",
                          type: "list",
                          message: `Please choose the employee's manager.`,
                          choices: employees}
                      ])
                      .then((answers) =>{
                        console.log(answers);
                        const updEmp = {
                          id: empId,
                          role: answers.employee_role,
                          manager: answers.employee_manager
                        }
                        const sql = `UPDATE employee SET role_id = ${updEmp.role}, manager_id = ${updEmp.manager} WHERE id = ${updEmp.id}`;
                        db.query(sql, (err,result)=>{
                          if(err){console.error(err)}
                          else(console.log("Employee updated successfully."));
                          runMenu();
                        })
                        
                      });
                  };
                });
                
              };}
                
            });
          })
      };
    };
  });
};
runMenu();
