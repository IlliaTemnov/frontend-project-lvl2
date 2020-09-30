import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

const readFile = (response) => {
  const absolutePath = path.resolve(process.cwd(), response);
  return fs.readFileSync(absolutePath, 'utf8');
};

export default (response) => {
  const format = path.extname(response);
  const data = readFile(response);
  const parseOption = {
    '.json': JSON.parse,
    '.yaml': yaml.safeLoad,
  };
  const result = parseOption[format](data);
  return result;
};
