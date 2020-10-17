/* eslint-disable no-underscore-dangle */
import { test, expect, describe } from '@jest/globals';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getFileData = (value) => fs.readFileSync(getFixturePath(value), 'utf8');

const jsonExpectedData = getFileData('expected_file_json');
const plainExpectedData = getFileData('expected_file_plain');
const stylishExpectedData = getFileData('expected_file_stylish');

const extentions = ['json', 'ini', 'yml'];
const formats = ['stylish', 'plain', 'json'];
const expectedData = {
  json: jsonExpectedData,
  plain: plainExpectedData,
  stylish: stylishExpectedData,
};

describe.each(extentions)('Data comparing of two configuration files, extention: %s', (extention) => {
  test.each(formats)(
    'output format: %s', (format) => {
      const path1 = getFixturePath(`file1.${extention}`);
      const path2 = getFixturePath(`file2.${extention}`);
      expect(gendiff(path1, path2, format)).toBe(expectedData[format]);
    },
  );
});
