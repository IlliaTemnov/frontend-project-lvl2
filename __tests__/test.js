/* eslint-disable no-underscore-dangle */
import { test, expect } from '@jest/globals';

import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const result = '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}';

test('generate a difference of the json plane files', () => {
  const pathOne = getFixturePath('1.json');
  const pathTwo = getFixturePath('2.json');
  expect(gendiff(pathOne, pathTwo)).toBe(result);
});

test('generate a difference of the yaml plane files', () => {
  const pathOne = getFixturePath('1.yaml');
  const pathTwo = getFixturePath('2.yaml');
  expect(gendiff(pathOne, pathTwo)).toBe(result);
});
