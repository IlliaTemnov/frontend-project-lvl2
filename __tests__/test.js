/* eslint-disable no-underscore-dangle */
import { test, expect } from '@jest/globals';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const result = fs.readFileSync(getFixturePath('after.txt'), 'utf8');
console.log(result);

test('generate a difference of the .json tree files', () => {
  const pathOne = getFixturePath('1.json');
  const pathTwo = getFixturePath('2.json');
  expect(gendiff(pathOne, pathTwo)).toBe(result);
});

test('generate a difference of the .yml tree files', () => {
  const pathOne = getFixturePath('1.yml');
  const pathTwo = getFixturePath('2.yml');
  expect(gendiff(pathOne, pathTwo)).toBe(result);
});

test('generate a difference of the .ini tree files', () => {
  const pathOne = getFixturePath('1.ini');
  const pathTwo = getFixturePath('2.ini');
  expect(gendiff(pathOne, pathTwo)).toBe(result);
});
