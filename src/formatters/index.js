import _ from 'lodash';
import stylish from './stylish.js';
import plain from './plain.js';

const formatOptions = { stylish, plain };
export default (format) => {
  if (_.has(formatOptions, format)) {
    return formatOptions[format];
  }
  return null;
};
