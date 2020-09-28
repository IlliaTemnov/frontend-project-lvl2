/* eslint-disable no-underscore-dangle */
import { test, expect } from '@jest/globals';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('generate a difference of the json plane files', () => {
  const pathOne = getFixturePath('1.json');
  const pathTwo = getFixturePath('2.json');
  const result = fs.readFileSync(getFixturePath('after.json'), 'utf8');
  expect(gendiff(pathOne, pathTwo)).toBe(result);
});
