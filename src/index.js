import parse from './parsers.js';
import compareData from './compareData.js';
import formatter from './formatters/index.js';

export default (path1, path2, format) => {
  const data1 = parse(path1);
  const data2 = parse(path2);
  const comparedData = compareData(data1, data2);
  return formatter(format)(comparedData);
};
