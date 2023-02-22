export function getQuestions(licenses) {
  return [
    {
      type: "input",
      name: "github",
      message: "Enter your GitHub user name."
    },
    {
      type: "input",
      name: "email",
      message: "Enter your email address."
    },
    {
      type: "input",
      name: "title",
      message: "Enter the title of your project.",
    },
    {
      type: "input",
      name: "description",
      message: "Enter a description of your project.",
    },
    {
      type: "input",
      name: "installation",
      message: "Enter the installation instructions for your project.",
    },
    {
      type: "input",
      name: "usage",
      message: "Enter the usage information for your project.",
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
    },
    {
      type: "input",
      name: "tests",
      message: "Enter the testing criteria for your project.",
    }
  ];
}
