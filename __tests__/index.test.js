/* eslint-disable no-underscore-dangle */
import { test, expect, describe } from '@jest/globals';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getFileData = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

const extentions = ['json', 'ini', 'yml'];

describe('Data comparing of two configuration files:', () => {
  const jsonResult = getFileData('expected_file_json.json');
  const plainResult = getFileData('expected_file_plain.txt');
  const stylishResult = getFileData('expected_file_stylish.txt');
  test.each(extentions)(
    'output format: %s', (extention) => {
      const path1 = getFixturePath(`file1.${extention}`);
      const path2 = getFixturePath(`file2.${extention}`);
      expect(gendiff(path1, path2)).toBe(stylishResult);
      expect(gendiff(path1, path2, 'stylish')).toBe(stylishResult);
      expect(gendiff(path1, path2, 'plain')).toBe(plainResult);
      expect(gendiff(path1, path2, 'json')).toBe(jsonResult);
    },
  );
});
