import yaml from 'js-yaml';
import ini from 'ini';

export default ({ data, format }) => {
  const parse = {
    '.json': JSON.parse,
    '.yml': yaml.safeLoad,
    '.yaml': yaml.safeLoad,
    '.ini': ini.parse,
  };
  return parse[format](data);
};
