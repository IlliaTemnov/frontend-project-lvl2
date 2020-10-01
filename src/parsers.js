import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import flatini from 'flatini';

const readFile = (response) => {
  const absolutePath = path.resolve(process.cwd(), response);
  return fs.readFileSync(absolutePath, 'utf8');
};

export default (response) => {
  const format = path.extname(response);
  const data = readFile(response);
  const parseOption = {
    '.json': JSON.parse,
    '.yml': yaml.safeLoad,
    '.yaml': yaml.safeLoad,
    '.ini': flatini,
  };
  const result = parseOption[format](data);
  console.log(result);
  return result;
};
