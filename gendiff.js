export default () => {
  const { program } = require('commander');
  program.version('1.0.0');
  program.description('Compares two configuration files and shows a difference.');
  program.parse(process.argv);
};
