/* eslint-disable no-underscore-dangle */
import { test, expect } from '@jest/globals';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getExpectResult = (value) => fs.readFileSync(getFixturePath(value), 'utf8');

const extentionsAndFormats = ['json', 'ini', 'yml'];

test.each(extentionsAndFormats)(
  'Generate a difference of the two files extention: %s with stylish, plain and json formats', (extention) => {
    const path1 = getFixturePath(`file1.${extention}`);
    const path2 = getFixturePath(`file2.${extention}`);
    expect(gendiff(path1, path2, 'stylish')).toBe(getExpectResult('expected_file_stylish.txt'));
    expect(gendiff(path1, path2, 'plain')).toBe(getExpectResult('expected_file_plane.txt'));
    expect(gendiff(path1, path2, 'json')).toBe(getExpectResult('expected_file_json.json'));
  },
);
