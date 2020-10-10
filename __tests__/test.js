/* eslint-disable no-underscore-dangle */
import { test, expect } from '@jest/globals';
import _ from 'lodash';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getExpectResult = (value) => {
  const expectResult = fs.readFileSync(getFixturePath(`${value}.txt`), 'utf8');
  return expectResult;
};

const extentions = ['.json', '.ini', '.yml'];
const formats = ['plain', 'stylish', 'json'];

_.forEach(extentions, (extention) => {
  _.forEach(formats, (format) => {
    test(`Generate a difference of the ${extention} files`, () => {
      const path1 = getFixturePath(`1${extention}`);
      const path2 = getFixturePath(`2${extention}`);
      expect(gendiff(path1, path2, `${format}`)).toBe(getExpectResult(format));
    });
  });
});
