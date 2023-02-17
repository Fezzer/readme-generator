import inquirer from "inquirer";
import { mkdir, opendir, writeFile } from "node:fs/promises";

const questions = [{
  type: "input",
  name: "title",
  message: "What is the title of your project?"
},{
  type: "input",
  name: "description",
  message: "Enter a description of your project?"
},{
  type: "input",
  name: "installation",
  message: "Enter the installation instructions for your project?"
},{
  type: "input",
  name: "usage",
  message: "Enter the usage information for your project?"
},{
  type: "input",
  name: "contributing",
  message: "Enter the contribution guidelines for your project?"
},{
  type: "input",
  name: "tests",
  message: "Enter the testing criteria for your project?"
}];

// Temporary answers to speed up testing.
const answers = {
  title: "Example project",
  description: "This is the description.",
  installation: "These are the installation instructions.",
  usage: "These are the installation instructions.",
  contributing: "These are the contribution guidelines for the project.",
  tests: "These are the testing guidelines for the project."
};

await inquirer
  .prompt(questions, answers)
  .then(async a => {
    try {
      const dir = await opendir("./output");
      await dir.close();
    } catch (error) {
      mkdir("./output");
    }

    const data = `# ${a.title}\n` +
      `## Table of Contents\n` +
      `- [Description](#description)\n` +
      `- [Installation](#installation)\n` +
      `- [Usage](#usage)\n` +
      `- [Contributing](#contributing)\n` +
      `- [Tests](#tests)\n` +
      `## Description\n${a.description}\n` +
      `## Installation\n${a.installation}\n` +
      `## Usage\n${a.usage}\n` +
      //`## License\n${answers.license}\n` +
      `## Contributing\n${a.contributing}\n` +
      `## Tests\n${a.tests}`;

    await writeFile("./output/README.md", data, { encoding: "utf8"})
  });