const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.

const team = [];

// =================================================================
// Taken from class and updated to create the logic
// =================================================================

// =================================================================
// Manager Questions
// =================================================================
inquirer
  .prompt([
    {
      type: "input",
      name: "managersName",
      message: "What is the managers name?",
    },
    {
      type: "input",
      name: "managersId",
      message: "What is the managers ID?",
    },
    {
      type: "input",
      name: "managersEmail",
      message: "What is the managers email address?",
    },
    {
      type: "input",
      name: "managersOfficeNumber",
      message: "What is the managers office number?",
    },
  ])
  .then((response) => {
    // =================================================================
    // Destructure the responce
    // =================================================================
    const { managersName, managersId, managersEmail, managersOfficeNumber } =
      response;
    // =================================================================
    // Create a new manager object
    // =================================================================
    const manager = new Manager(
      managersName,
      managersId,
      managersEmail,
      managersOfficeNumber
    );
    // =================================================================
    // Push the object into the team array
    // =================================================================
    team.push(manager);

    // =================================================================
    // Prompt for the next employee
    // =================================================================
    promptForNextEmployee();
  });

// =================================================================
// Prompts for the next employee
// =================================================================
const promptForNextEmployee = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Do you want to add another employee?",
        name: "nextEmployeeOptions",
        choices: ["Engineer", "Intern", "Nope, all done"],
      },
    ])
    .then((response) => {
      // =================================================================
      // Conditional actions from response
      // =================================================================
      if (response.nextEmployeeOptions === "Engineer") {
        promptForEngineer();
        console.log(`You have chosen ${response.nextEmployeeOptions}`);
      } else if (response.nextEmployeeOptions === "Intern") {
        promptForIntern();
        console.log(`You have chosen ${response.nextEmployeeOptions}`);
      } else {
        buildPage();
      }
    });
};

// =================================================================
// Engineer Questions
// =================================================================
const promptForEngineer = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "engineerName",
        message: "What is the engineer name?",
      },
      {
        type: "input",
        name: "engineerId",
        message: "What is the engineer ID?",
      },
      {
        type: "input",
        name: "engineerEmail",
        message: "What is the engineers email?",
      },
      {
        type: "input",
        name: "engineerGithub",
        message: "What is the engineer GitHub username?",
      },
    ])
    .then((response) => {
      // =================================================================
      // Destructure the responce
      // =================================================================
      const { engineerName, engineerId, engineerEmail, engineerGithub } =
        response;

      // =================================================================
      // Create a new engineer object
      // =================================================================
      const engineer = new Engineer(
        engineerName,
        engineerId,
        engineerEmail,
        engineerGithub
      );

      // =================================================================
      // Push the object into the team array
      // =================================================================
      team.push(engineer);

      // =================================================================
      // Prompts for the next employee
      // =================================================================
      promptForNextEmployee();
    });
};

// =================================================================
// Intern Questions
// =================================================================
const promptForIntern = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "internName",
        message: "What is the interns name?",
      },
      {
        type: "input",
        name: "internId",
        message: "What is the interns ID?",
      },
      {
        type: "input",
        name: "internEmail",
        message: "What is the interns email?",
      },
      {
        type: "input",
        name: "internSchool",
        message: "What is the name of the school the intern attends?",
      },
    ])
    .then((response) => {
      // =================================================================
      // Destructure the response
      // =================================================================
      const { internName, internId, internEmail, internSchool } = response;

      // =================================================================
      // Creates a new intern object
      // =================================================================
      const intern = new Intern(
        internName,
        internId,
        internEmail,
        internSchool
      );

      // =================================================================
      // Push the object into the team array
      // =================================================================
      team.push(intern);

      // =================================================================
      // Prompts for the next employee
      // =================================================================
      promptForNextEmployee();
    });
};

const buildPage = () => {
  console.log("lets build the web page");

  // =================================================================
  // Writes the file in the output folder
  // =================================================================
  fs.writeFile(outputPath, render(team), (err) => {
    // =================================================================
    // Throws an error if there is an error
    // =================================================================
    if (err) {
      throw err;
    }
    // =================================================================
    // Prints to the console if successful
    // =================================================================
    console.log("Successfully created the team.html page!!!");
  });
};
