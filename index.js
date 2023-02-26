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

// inquirer
//   .prompt([
//     {
//       type: 'input',
//       name: 'name',
//       message: 'What is your name?',
//     },
//     {
//       type: 'checkbox',
//       message: 'What languages do you know?',
//       name: 'stack',
//       choices: ['HTML', 'CSS', 'JavaScript', 'MySQL'],
//     },
//     {
//       type: 'list',
//       message: 'What is your preferred method of communication?',
//       name: 'contact',
//       choices: ['email', 'phone', 'telekinesis'],
//     },
//   ])
//   .then((data) => {
//     const filename = `${data.name.toLowerCase().split(' ').join('')}.json`;

//     fs.writeFile(filename, JSON.stringify(data, null, '\t'), (err) =>
//       err ? console.log(err) : console.log('Success!')
//     );
//   });

// Employee ID
// Email address
// Office number

// =================================================================
// Taken from class
// =================================================================

inquirer
  .prompt([
    //manager questions
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
    // populate manager info
    const { managersName, managersId, managersEmail, managersOfficeNumber } =
      response;
    const manager = new Manager(
      managersName,
      managersId,
      managersEmail,
      managersOfficeNumber
    );
    // ...Object.values(response)
    console.log(manager);

    promptForNextEmployee();
  });

const promptForNextEmployee = () => {
  inquirer
    .prompt([
      // choice of 3
      {
        type: "list",
        message: "Do you want to add another employee?",
        name: "nextEmployeeOptions",
        choices: ["Engineer", "Intern", "Nope, all done"],
      },
    ])
    .then((response) => {
      //   console.log(Object.values(response));
      if (response.nextEmployeeOptions === "Engineer") {
        // if engineer
        //    promptForEngineer
        promptForEngineer();
        console.log(`You have chosen ${response.nextEmployeeOptions}`);
      } else if (response.nextEmployeeOptions === "Intern") {
        // else if intern
        //    promptForIntern
        promptForIntern();
        console.log(`You have chosen ${response.nextEmployeeOptions}`);
      } else {
        //    use the functionality from page-template to generate the team
        buildPage()
      }
    });
};

const promptForEngineer = () => {
  inquirer
    .prompt([
      //engineer questions
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
      // add new engineer to employees array
      // promptForNextEmployee
      promptForNextEmployee();
    });
};

const promptForIntern = () => {
  inquirer
    .prompt([
      //intern questions
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
      // add new intern to employees array
      // promptForNextEmployee
      promptForNextEmployee();
    });
};

const buildPage = () => {
  console.log("lets build the page");
  // render(myArrayOfTeamMembers)
};
