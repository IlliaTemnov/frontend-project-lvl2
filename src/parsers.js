import yaml from 'js-yaml';
import ini from 'ini';

export default (data, extension) => {
  const parse = {
    '.json': JSON.parse,
    '.yml': yaml.safeLoad,
    '.yaml': yaml.safeLoad,
    '.ini': ini.parse,
  };
  return parse[extension](data);
};
