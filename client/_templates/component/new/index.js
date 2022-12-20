const inflection = require('inflection');

module.exports = {
  prompt: async ({ prompter }) => {
    const { type } = await prompter.prompt({
      type: 'select',
      name: 'type',
      choices: ['Atom', 'Molecule', 'Organism', 'Template'],
      message: 'What type do you want to create?',
    });

    const { name } = await prompter.prompt({
      type: 'input',
      name: 'name',
      message: "What's the name of your " + type + '?',
    });

    if (name[0].toLowerCase() === name[0]) {
      console.log('Components should be in Titlecase.');
      process.exit(1);
    }

    const types = inflection.pluralize(type.toLowerCase());
    const fileName = `${types}/${name}/${name}`;
    const nameInCamelCase = name[0].toLowerCase() + name.substr(1);
    return {
      type,
      types,
      name,
      nameInCamelCase,
      path_from_root: `src/components/${fileName}`,
      path_from_types: `./${name}/${name}`,
      path_from_components: `./${fileName}`,
    };
  },
};
