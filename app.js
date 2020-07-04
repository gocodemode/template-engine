const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

function promptUser() {
    inquirer
        .prompt([
        {
            type: "list",
            message: "Would you like to add a member to your company?",
            name: "mainChoice",
            choices: ["Yes", "No"],
        },
        ])
        .then((answer) => {
            if (answer.mainChoice === "Yes") {
                inquirer.prompt ([
                    {
                        type: "list",
                        name: "choices",
                        message: "What is your role in the company?",
                        choices: ["Manager", "Intern", "Engineer"],  
                    }    
                    ])
                    .then(function(choices) {
                        switch (choices.choices){
                            case "Manager":
                                newManager();
                            break;
                            case "Intern":
                                newIntern()
                                break;
                            case "Engineer":
                                newEngineer();
                                break;
                        }
                    });
            } else {
            console.log(JSON.stringify(employees, null, 2));
            fs.writeFileSync(outputPath, render(employees), "utf-8");
            }
        })
        .catch((err) => {
            throw err;
        });
};  


function newManager() {
    inquirer.prompt ([
        {
            type: "input",
            name: "name",
            message: "What is your name?",
        },
        {
            type: "input",
            name: "id",
            message: "What is your ID number?",
        },
        {
            type: "input",
            name: "email",
            message: "What is your email address?",
        },
        {
        type: "input", 
        name: "officeNumber",
        message: "What is your Office Number?",
        }
    ])
    .then((answers) => {
        const employee = new Manager(
            answers.name,
            answers.id,
            answers.email,
            answers.officeNumber
        );

        employees.push(employee);

        promptUser()

    })
};

function newIntern() {
    inquirer.prompt ([
        {
            type: "input",
            name: "name",
            message: "What is your name?",
        },
        {
            type: "input",
            name: "id",
            message: "What is your ID number?",
        },
        {
            type: "input",
            name: "email",
            message: "What is your email address?",
        },
        {
        type: "input", 
        name: "school",
        message: "Which school are you interning with?",
        }
    ])
    .then((answers) => {
        const employee = new Intern(
            answers.name,
            answers.id,
            answers.email,
            answers.school
        );

        employees.push(employee);

        promptUser()
    })
};

function newEngineer() {
    inquirer.prompt ([
        {
            type: "input",
            name: "name",
            message: "What is your name?",
        },
        {
            type: "input",
            name: "id",
            message: "What is your ID number?",
        },
        {
            type: "input",
            name: "email",
            message: "What is your email address?",
        },
        {
        type: "input", 
        name: "github",
        message: "What is your Github ID?",
        }
    ])
    
    .then((answers) => {
        const employee = new Engineer(
            answers.name,
            answers.id,
            answers.email,
            answers.github
        );

        employees.push(employee);

        promptUser()
    })
};

promptUser();


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided render function to work!