const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");

const writeFileAsync = util.promisify(fs.writeFile);
const appendFileData = util.promisify(fs.appendFile);

function promptUser() {
  return inquirer.prompt([
    {
        message: "Enter your GitHub username:",
        name: "username"
    },
    {
      type: "input",
      name: "title",
      message: "Enter README title: "
    },
    {
        type: "input",
        name: "description",
        message: "Type README Description here: "
    },
    {
        type: "input",
        name: "tableOfContents",
        message: "List Table of Contents: "
    },
    {
        type: "input",
        name: "installation",
        message: "Installation instructions: "
    },
    {
        type: "input",
        name: "usage",
        message: "Usage: "
    },
    {
        type: "input",
        name: "license",
        message: "License info: "
    },
    {
        type: "input",
        name: "contributing",
        message: "Contributors: "
    },
    {
        type: "input",
        name: "tests",
        message: "Tests: "
    },
    {
        type: "input",
        name: "questions",
        message: "Questions: "
    }
  ])
}

function generateREADME(answers) {
  return `
# **${answers.title}**
*${answers.description}*

## Table of contents: 
${answers.tableOfContents}

### Installation: 
${answers.installation}
\nUsage: ${answers.usage}
\nLicense: ${answers.license}
\nContributors: ${answers.contributing}
\nTests: ${answers.tests}
\nQuestions: ${answers.questions}
`;
}

async function generateGithubInfo(username) {
    const queryUrl = `https://api.github.com/users/${username}`;
    const res = await axios.get(queryUrl);
    const ghImg = res.data.avatar_url;
    const ghEmail = res.data.email;

    return `
    \n**Created by: ${ghEmail}** 
    \n<img src="${ghImg}" height="150" width="150">`;
}   

async function init() {
  try {
    const answers = await promptUser();
    const github = await generateGithubInfo(answers.username);
    const readme = generateREADME(answers);

    await writeFileAsync("README1.md", readme);
    await appendFileData("README1.md", github);

    console.log("README successfully created!");
  } catch(err) {
    console.log(err);
  }
}

init();
