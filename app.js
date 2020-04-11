var inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const Engineer = require("./lib/Engineer");
const renderemployees = require("./lib/generatehtml");
const team = [];

function managerquestions() {
  inquirer
    .prompt([
      {
        name: "managername",
        type: "input",
        message: "What is employee manager's name?"
      },
      {
        name: "managerid",
        type: "number",
        message: "What is employee manager's id?"
      },
      {
        name: "manageremail",
        type: "input",
        message: "What is employee manager's email?"
      },
      {
        name: "managerofficenumb",
        type: "number",
        message: "What is employee manager's office number?"
      }
    ])
    .then(answers => {
      const newmanager = new Manager(
        answers.managername,
        answers.managerid,
        answers.manageremail,
        answers.managerofficenumb
      );
      team.push(newmanager);
      teammemberquestions();

    })
    .catch(error => {
      console.log(error); 
    });
}
function teammemberquestions() {
  inquirer
    .prompt([
      {
        name: "employeetype",
        type: "list",
        choices: ["engineer", "intern"],
        message: "What is the type of Employee?"
      }
    ])
    .then(answers => {
      if (answers.employeetype === "engineer") {
        engineerquestions();
      } else if (answers.employeetype === "intern") {
        internquestions();
      }
    })
    .catch(error => {
      console.log(error);
    });
}
function internquestions() {
  inquirer
    .prompt([
      {
        name: "internname",
        type: "input",
        message: "What is intern's name?"
      },
      {
        name: "internid",
        type: "number",
        message: "What is the intern's id?"
      },
      {
        name: "internemail",
        type: "input",
        message: "What is the intern's email?"
      },
      {
        name: "schoolname",
        type: "input",
        message: "What is the name of your school?"
      }
    ])
    .then(answers => {
      const newintern = new Intern(
        answers.internname,
        answers.internid,
        answers.internemail,
        answers.schoolname
      );
      team.push(newintern);
      nextteammember();
    })
    .catch(error => {
      console.log(error);
    });
}

function engineerquestions() {
  inquirer
    .prompt([
      {
        name: "engineername",
        type: "input",
        message: "What is the engineer's name?"
      },
      {
        name: "engineerid",
        type: "number",
        message: "What is the engineer's id?"
      },
      {
        name: "engineeremail",
        type: "input",
        message: "What is the engineer's email?"
      },
      {
        name: "github",
        type: "input",
        message: "What is your GitHub user name?"
      }
    ])
    .then(answers => {
      const newengineer = new Engineer(
        answers.engineername,
        answers.engineerid,
        answers.engineeremail,
        answers.github
      );
      team.push(newengineer);
      nextteammember();
    })
    .catch(error => {
      console.log(error);
    });
}

function nextteammember() {
  inquirer
    .prompt([
      {
        name: "nextname",
        type: "list",
        choices: ["Yes", "No"],
        message: "Are there additional employees?"
      }
    ])
    .then(answers => {
      if (answers.nextname === "No") {
        console.log(team);
        fs.writeFileSync(
          path.resolve(__dirname, "output", "employees.html"),
          renderemployees(team),
          "UTF-8"
        );
        return;
      } else if (answers.nextname === "Yes") {
        teammemberquestions();
      }
    })
    .catch(error => {
      console.log(error);
    });
}
managerquestions();
