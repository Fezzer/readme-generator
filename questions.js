/**
 * Gets the questions to ask in Inquirer needed to generate a readme file.
 * @param {Array} licenses The license options.
 * @returns An array of Inquirer questions.
 */
export function getQuestions(licenses) {
  return [
    {
      type: "input",
      name: "github",
      message: "Enter your GitHub user name.",
      validate: NonEmptyStringValidator
    },
    {
      type: "input",
      name: "email",
      message: "Enter your email address.",
      validate: NonEmptyStringValidator
    },
    {
      type: "input",
      name: "title",
      message: "Enter the title of your project.",
      validate: NonEmptyStringValidator
    },
    {
      type: "input",
      name: "description",
      message: "Enter a description of your project.",
      validate: NonEmptyStringValidator
    },
    {
      type: "input",
      name: "installation",
      message: "Enter the installation instructions for your project.",
      validate: NonEmptyStringValidator
    },
    {
      type: "input",
      name: "usage",
      message: "Enter the usage information for your project.",
      validate: NonEmptyStringValidator
    },
    {
      type: "autocomplete",
      name: "license",
      message: "Select your license.",
      source: (_, input = "") =>
        Promise.resolve(
          licenses
            .filter((l) => l.name.toLowerCase().includes(input.toLowerCase()))
            .map((l) => l.name)
        ),
    },
    {
      type: "input",
      name: "contributing",
      message: "Enter the contribution guidelines for your project.",
      validate: NonEmptyStringValidator
    },
    {
      type: "input",
      name: "tests",
      message: "Enter the testing criteria for your project.",
      validate: NonEmptyStringValidator
    }
  ];
}

/**
 * Validates that the specified value is not entirely whitespace. 
 * @param {string} value The value to validate.
 * @returns True if the value is valid, otherwise an error message.
 */
function NonEmptyStringValidator(value) {
  if (value.trim() !== "") {
    return true;
  }

  return "Please enter a valid answer."
}