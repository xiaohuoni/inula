export default (api) => {
  api.registerCommand({
    name: 'version',
    alias: 'v',
    description: 'show inula version',
    fn({ args }) {
      const { version, name } = require('../package.json');
      if (!args.quiet) {
        console.log(`${name}@${version}`);
      }
      return version;
    },
  });
};
