import _ from 'lodash';
import parsers from './parsers.js';

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
  const dataOne = parsers(pathOne);
  const dataTwo = parsers(pathTwo);
  const reportData = buildReportData(dataOne, dataTwo);
  return reportData;
};
