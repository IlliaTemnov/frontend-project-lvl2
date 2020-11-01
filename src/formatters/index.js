import _ from 'lodash';
import stylish from './stylish.js';
import plain from './plain.js';

const json = JSON.stringify;
const formatters = { stylish, plain, json };

export default (outputFormat, diff) => {
  if (_.has(formatters, outputFormat)) {
    return formatters[outputFormat](diff);
  }
  throw new Error(`Unexpected format ${outputFormat}`);
};
