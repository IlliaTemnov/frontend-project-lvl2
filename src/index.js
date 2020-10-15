import path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import buildDiff from './buildDiff.js';
import formatter from './formatters/index.js';

const getFileData = (filePath) => {
  const absolutePath = path.resolve(process.cwd(), filePath);
  return fs.readFileSync(absolutePath, 'utf8');
};

const getFileExt = (filePath) => path.extname(filePath);

export default (path1, path2, format) => {
  const data1 = parse(getFileData(path1), getFileExt(path1));
  const data2 = parse(getFileData(path2), getFileExt(path2));
  const diff = buildDiff(data1, data2);
  return formatter(format)(diff);
};
