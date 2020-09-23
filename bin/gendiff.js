#!/usr/bin/env node
import program from 'commander';
import getDiff from '../src/index.js';

program
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .action((dataOne, dataTwo) => {
    console.log(getDiff(dataOne, dataTwo));
  });
program.option('-f, --format [type] ', 'output format');
program.parse(process.argv);
