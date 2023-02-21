import inquirer from "inquirer";
import inquirerPrompt from "inquirer-autocomplete-prompt";
import { defaultAnswers } from "./defaultAnswers.js";
import { getQuestions } from "./questions.js";
import { createReadMeText, getLicensesAsync, writeReadMeAsync } from "./helpers.js";

const licenses = await getLicensesAsync();
const questions = getQuestions(licenses);

inquirer.registerPrompt("autocomplete", inquirerPrompt);

const answers = await inquirer
  .prompt(questions, defaultAnswers)
  .then(answers => answers);
  
const data = createReadMeText(answers, licenses);

await writeReadMeAsync("./output", "README.md", data);