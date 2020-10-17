import yaml from 'js-yaml';
import ini from 'ini';

const parse = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  yaml: yaml.safeLoad,
  ini: ini.parse,
};

export default (data, extension) => parse[extension](data);
