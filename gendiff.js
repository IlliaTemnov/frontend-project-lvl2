import { Command } from 'commander';

export default () => {
  const program = new Command();
  program.version('1.0.0');
  program.description('Compares two configuration files and shows a difference.');
  program.parse(process.argv);
};
