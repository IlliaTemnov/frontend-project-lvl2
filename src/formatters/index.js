import _ from 'lodash';
import stylish from './stylish.js';
import plain from './plain.js';

const formatters = { stylish, plain };

export default (outputFormat, diff) => {
  if (outputFormat === 'json') {
    return JSON.stringify(diff);
  }
  if (_.has(formatters, outputFormat)) {
    return formatters[outputFormat](diff);
  }
  throw new Error(`Unexpected format ${outputFormat}`);
};
