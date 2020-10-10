import _ from 'lodash';
import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatOptions = { stylish, plain, json };
export default (format) => {
  if (_.has(formatOptions, format)) {
    return formatOptions[format];
  }
  return null;
};
