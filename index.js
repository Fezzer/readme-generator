import inquirer from "inquirer";
import { mkdir, opendir, readFile, writeFile } from "node:fs/promises";
import inquirerPrompt from "inquirer-autocomplete-prompt";

const licenses = JSON.parse(await readFile("./license-badges.json", { encoding: "utf8" }));

const questions = [{
  type: "input",
  name: "title",
  message: "Enter the title of your project."
},{
  type: "input",
  name: "description",
  message: "Enter a description of your project."
},{
  type: "input",
  name: "installation",
  message: "Enter the installation instructions for your project."
},{
  type: "input",
  name: "usage",
  message: "Enter the usage information for your project."
},{
  type: "autocomplete",
  name: "license",
  message: "Select your license.",
  source: (_, input = "") => Promise.resolve(
    licenses
      .filter(l => l.name.toLowerCase().includes(input.toLowerCase()))
      .map(l => l.name))
},{
  type: "input",
  name: "contributing",
  message: "Enter the contribution guidelines for your project."
},{
  type: "input",
  name: "tests",
  message: "Enter the testing criteria for your project."
}];

// Temporary answers to speed up testing.
const answers = {
  title: "Example project",
  description: "This is the description.",
  installation: "These are the installation instructions.",
  usage: "These are the installation instructions.",
  license: "Apache 2.0 License",
  contributing: "These are the contribution guidelines for the project.",
  tests: "These are the testing guidelines for the project."
};

inquirer.registerPrompt("autocomplete", inquirerPrompt);

inquirer
  .prompt(questions, answers)
  .then(async a => {
    try {
      const dir = await opendir("./output");
      await dir.close();
    } catch (error) {
      mkdir("./output");
    }

    const data = `# ${a.title} ${licenses.find(l => l.name === a.license).badge}\n` +
      `## Table of Contents\n` +
      `- [Description](#description)\n` +
      `- [Installation](#installation)\n` +
      `- [Usage](#usage)\n` +
      `- [License](#license)\n` +
      `- [Contributing](#contributing)\n` +
      `- [Tests](#tests)\n` +
      `## Description\n${a.description}\n` +
      `## Installation\n${a.installation}\n` +
      `## Usage\n${a.usage}\n` +
      `## License\nThis repo is licensed under ${a.license}.\n` +
      `## Contributing\n${a.contributing}\n` +
      `## Tests\n${a.tests}`;

    await writeFile("./output/README.md", data, { encoding: "utf8"})
  });