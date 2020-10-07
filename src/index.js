import parse from './parsers.js';
import compareData from './compareData.js';
import genStylish from './formatters/stylish.js';

export default (path1, path2) => {
  const data1 = parse(path1);
  const data2 = parse(path2);
  const result = compareData(data1, data2);
  return genStylish(result);
};
