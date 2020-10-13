import _ from 'lodash';
import stylish from './stylish.js';
import plain from './plain.js';

const formatters = { stylish, plain };

export default (format) => {
  if (format === 'json') {
    return JSON.stringify;
  }
  if (_.has(formatters, format)) {
    return formatters[format];
  }
  throw new Error(`Unexpected format ${format}`);
};
