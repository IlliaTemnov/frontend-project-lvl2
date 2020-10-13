import path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import buildDiff from './buildDiff.js';
import formatter from './formatters/index.js';

const getDataFromFile = (response) => {
  const absolutePath = path.resolve(process.cwd(), response);
  const data = fs.readFileSync(absolutePath, 'utf8');
  const format = path.extname(response);
  return { data, format };
};

export default (path1, path2, format) => {
  const data1 = parse(getDataFromFile(path1));
  const data2 = parse(getDataFromFile(path2));
  const diff = buildDiff(data1, data2);
  return formatter(format)(diff);
};
