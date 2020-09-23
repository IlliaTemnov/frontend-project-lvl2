import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const readFile = (response) => {
  if (!fs.statSync(response).isFile) { return null; }
  const absolutePath = path.resolve(process.cwd(), response);
  return fs.readFileSync(absolutePath, 'utf8');
};

const readExtName = (response) => path.extname(response);
const parse = (data) => JSON.parse(data);

const buildReportData = (dataOne, dataTwo) => {
  const firstKeys = Object.keys(dataOne);
  const secondKeys = Object.keys(dataTwo);
  const bothFilesKeys = _.union(firstKeys, secondKeys).sort();
  const result = bothFilesKeys.map((key) => {
    if (dataOne[key] === dataTwo[key]) {
      return `  ${key}: ${dataOne[key]}`;
    }
    if (!_.has(dataOne, key)) {
      return `+ ${key}: ${dataTwo[key]}`;
    }
    if (!_.has(dataTwo, key)) {
      return `- ${key}: ${dataOne[key]}`;
    }
    return `- ${key}: ${dataOne[key]}\n  + ${key}: ${dataTwo[key]}`;
  });
  const str = `{\n  ${result.join('\n  ')}\n}`;
  return str;
};

export default (pathOne, pathTwo) => {
  const dataOne = parse(readFile(pathOne), readExtName(pathOne));
  const dataTwo = parse(readFile(pathTwo), readExtName(pathTwo));
  const reportData = buildReportData(dataOne, dataTwo);
  return reportData;
};
