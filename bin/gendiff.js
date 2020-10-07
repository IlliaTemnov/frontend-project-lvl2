#!/usr/bin/env node
import program from 'commander';
import genDiff from '../src/index.js';

program
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .action((path1, path2) => {
    console.log(genDiff(path1, path2, program.format));
  });
program.option('-f, --format [type] ', 'output format', 'stylish');
program.parse(process.argv);
