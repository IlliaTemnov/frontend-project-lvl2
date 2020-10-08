import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import ini from 'ini';

const readFile = (response) => {
  const absolutePath = path.resolve(process.cwd(), response);
  return fs.readFileSync(absolutePath, 'utf8');
};

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
  return result;
};
