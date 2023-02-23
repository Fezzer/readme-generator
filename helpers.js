import { opendir, mkdir, writeFile, readFile } from "node:fs/promises";

/**
 * Checks if the specified directory exists, and, if it does not, creates it.
 * @param {string} path The directory to check if it exists.
 */
async function checkFolderExistsAsync(path) {
  try {
    const dir = await opendir(path);
    await dir.close();
  } catch (error) {
    mkdir(path);
  }
}

/**
 * Writes the data into a file and saves it in the specified directory with the specified name.
 * @param {string} path The directory where the file containing the data will be written.
 * @param {string} file The name of the file that will be created.
 * @param {string} data The data to write into the created file.
 */
export async function writeReadMeAsync(path, file, data) {
  await checkFolderExistsAsync(path);

  await writeFile(`${path}/${file}`, data, { encoding: "utf8"});
}

/**
 * Gets the license options.
 * @returns A promise that resolves to an object containing the license options.
 */
export async function getLicensesAsync() {
  return JSON.parse(await readFile("./license-badges.json", { encoding: "utf8" }));
}

/**
 * Generates the contents of a readme file from the specified answers and license options.
 * @param {Array} answers An array of Inquirer answers.
 * @param {Array} licenses The license options.
 * @returns The contents of the readme file. 
 */
export function createReadMeText(answers, licenses) {
  return `# ${answers.title} ${licenses.find(l => l.name === answers.license).badge}\n\n` +
    `## Table of Contents\n` +
    `- [Description](#description)\n` +
    `- [Installation](#installation)\n` +
    `- [Usage](#usage)\n` +
    `- [License](#license)\n` +
    `- [Contributing](#contributing)\n` +
    `- [Tests](#tests)\n\n` +
    `- [Questions](#questions)\n\n` +
    `## Description\n${answers.description}\n\n` +
    `## Installation\n${answers.installation}\n\n` +
    `## Usage\n${answers.usage}\n\n` +
    `## License\nThis repo is licensed under ${answers.license}.\n\n` +
    `## Contributing\n${answers.contributing}\n\n` +
    `## Tests\n${answers.tests}\n\n` +
    `## Questions\nIf you have any questions, please contact me via [GitHub](https://github.com/${answers.github}) or on email, <${answers.email}>.`;
}