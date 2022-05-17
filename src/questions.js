const Questions = {
    menu: {
        name:"menu_selection",
        type: "list",
        message:"What would you like to do?",
        choices:[
        "View all departments", 
        "View all roles", 
        "View all employees", 
        "Add a department", 
        "Add a role", 
        "Add an employee", 
        "Edit an employee",
        "Quit"]
    },
    department:{
        name: "department_name",
        type: "input",
        message: "Please enter the name of the department to add",
    },
    role: {
        title: {
            name: "role_title",
            type: "input",
            message:"Please enter the title of the role to add"
        },
        salary: {
            name: "role_salary",
            type: "input",
            message:"Please enter the salary of the role"
        }
    },
    employee: {
        firstname: {
            name: "employee_first",
            type: "input",
            message: "Please enter the employee's first name"
        },
        lastname: {
            name: "employee_last",
            type: "input",
            message: "Please enter the employee's last name"
        }
    }


}

module.exports = Questions;