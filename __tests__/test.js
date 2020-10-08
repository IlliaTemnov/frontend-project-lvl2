/* eslint-disable no-underscore-dangle */
import { test, expect } from '@jest/globals';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
// const stylish = fs.readFileSync(getFixturePath('afterStylish.txt'), 'utf8');
const resultPlain = fs.readFileSync(getFixturePath('afterPlain.txt'), 'utf8');

test('generate a difference of the .json tree files', () => {
  const path1 = getFixturePath('1.json');
  const path2 = getFixturePath('2.json');
  console.log(gendiff(path1, path2, 'plain'));
  console.log(resultPlain);
  expect(gendiff(path1, path2, 'plain')).toBe(resultPlain);
});

// test('generate a difference of the .yml tree files', () => {
//   const path1 = getFixturePath('1.yml');
//   const path2 = getFixturePath('2.yml');
//   expect(gendiff(path1, path2, 'plain')).toBe(resultPlain);
// });

// test('generate a difference of the .ini tree files', () => {
//   const path1 = getFixturePath('1.ini');
//   const path2 = getFixturePath('2.ini');
//   expect(gendiff(path1, path2, 'plain')).toBe(resultPlain);
// });
