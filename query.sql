SELECT employee.id, first_name, last_name, title, salary, dept_name, manager_id 
FROM employee
JOIN role ON employee.role_id=role.id
JOIN department ON role.department_id=department.id;

