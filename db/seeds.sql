INSERT INTO department (dept_name)
VALUES  ("Sales"),
        ("Engineering"),
        ("Finance"),
        ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES  ("Salesperson", 068000.00, 1),
        ("Sales Team Lead", 073000.00,1),
        ("Software Egineer", 093000.00, 2),
        ("Lead Engineer", 133000.00, 2),
        ("Accountant", 073000.00, 3),
        ("Account Manager", 058000.00, 3),
        ("Lawyer", 190000.00, 4),
        ("Legal Team Lead", 250000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("John", "Sampleman", 2, 1),
        ("Eric", "Andre", 1, 1),
        ("Sandra","Bowlcut", 4, 3),
        ("Johnny", "Depth", 3, 3),
        ("Franklin", "Rosenthall", 6, 5),
        ("Vladimir", "Pullin", 5, 5),
        ("Saul", "Badman", 8, 7),
        ("Walter", "Gray", 7, 7);