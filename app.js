const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeeArray = []
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const questions = [
    {
        type: "list",
        message: "Would you like to add an employee?",
        name: "employee",
        choices:["Yes","No"]
    },

    {
        type: "list",
        message: "What is your role?",
        name: "role",
        choices:["Intern","Engineer","Manager"],
        when: function (questions) {
            return questions.employee === "Yes"
        }
    },

    {
        type: "input",
        message: "What is your name?",
        name: "name",
        when: function (questions) {
            return questions.employee === "Yes"
        }
    },

    {
        type: "input",
        message: "What is your id number?",
        name: "id",
        when: function (questions) {
            return questions.employee === "Yes"
        }
    },

    {
        type: "input",
        message: "What is your email?",
        name: "email",
        when: function (questions) {
            return questions.employee === "Yes"
        }
    },

//Intern question
    {
        type: "input",
        message: "What school do you go to?",
        name: "school",
        when: function (questions) {
            return questions.role === "Intern"
        }
    },
//Engineer question
    {
        type: "input",
        message: "What is your github?",
        name: "github",
        when: function (questions) {
            return questions.role === "Engineer"
        }
    },
//Manager question
    {
        type:"input",
        message:"What is your office number?",
        name:"officeNumber",
        when: function (questions) {
            return questions.role === "Manager"
        }
    },

];
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
// function to write in HTML file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, function () {

    })
}

// function to initialize program
function init() {
    inquirer.prompt(questions).then(function (data) {

        if(data.employee=== "Yes"){
            switch(data.role){
                case "Manager":
                addManager(data)
                    break
                case "Intern":
                addIntern(data)
                    break
                case "Engineer":
                addEngineer(data)
                    break
            }
            init();
        }
        else{
            if(employeeArray.length>0){
                const HTML = render(employeeArray)
                writeToFile(outputPath, HTML)
            }
        }
    })
}
function addManager(data){
    const manager=new Manager(data.name,data.id,data.email,data.officeNumber)
    employeeArray.push(manager)
}
function addIntern(data){
    const intern= new Intern(data.name,data.id,data.email,data.school)
    employeeArray.push(intern)
}
function addEngineer(data){
    const engineer= new Engineer(data.name,data.id,data.email,data.github)
    employeeArray.push(engineer)
}



// function call to initialize program
init();


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
// for the provided `render` function to work! ```
