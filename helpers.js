import { opendir, mkdir, writeFile, readFile } from "node:fs/promises";

async function checkFolderExistsAsync(path) {
  try {
    const dir = await opendir(path);
    await dir.close();
  } catch (error) {
    mkdir(path);
  }
}

export async function writeReadMeAsync(path, file, data) {
  await checkFolderExistsAsync(path);

  await writeFile(`${path}/${file}`, data, { encoding: "utf8"});
}

export async function getLicensesAsync() {
  return JSON.parse(await readFile("./license-badges.json", { encoding: "utf8" }));
}

export function createReadMeText(answers, licenses) {
  return `# ${answers.title} ${licenses.find(l => l.name === answers.license).badge}\n\n` +
    `## Table of Contents\n` +
    `- [Description](#description)\n` +
    `- [Installation](#installation)\n` +
    `- [Usage](#usage)\n` +
    `- [License](#license)\n` +
    `- [Contributing](#contributing)\n` +
    `- [Tests](#tests)\n\n` +
    `## Description\n${answers.description}\n\n` +
    `## Installation\n${answers.installation}\n\n` +
    `## Usage\n${answers.usage}\n\n` +
    `## License\nThis repo is licensed under ${answers.license}.\n\n` +
    `## Contributing\n${answers.contributing}\n\n` +
    `## Tests\n${answers.tests}`;
}