import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import ini from 'ini';
import _ from 'lodash';

const readFile = (response) => {
  const absolutePath = path.resolve(process.cwd(), response);
  return fs.readFileSync(absolutePath, 'utf8');
};

const formatToNumber = (data) => _.reduce(data, (acc, value, key) => {
  if (_.isObject(value)) acc[key] = formatToNumber(value);
  else if (!_.isBoolean(value) && _.toNumber(value)) acc[key] = _.toNumber(value);
  else acc[key] = value;
  return acc;
}, {});

export default (response) => {
  const format = path.extname(response);
  const data = readFile(response);
  const parse = {
    '.json': JSON.parse,
    '.yml': yaml.safeLoad,
    '.yaml': yaml.safeLoad,
    '.ini': ini.parse,
  };
  const result = parse[format](data);
  if (format === '.ini') { return formatToNumber(result); }
  return result;
};
