import _ from 'lodash';

const buildDiff = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2));
  const sortedKeys = _.sortBy(keys);
  const diff = sortedKeys.map((key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      if (!_.isArray(data1[key]) && !_.isArray(data2[key])) {
        return {
          key,
          type: 'nested',
          children: buildDiff(data1[key], data2[key]),
        };
      }
    }
    if (JSON.stringify(data1[key]) === JSON.stringify(data2[key])) {
      return {
        key,
        type: 'equal',
        value: data2[key],
      };
    }
    if (!_.has(data1, key)) {
      return {
        key,
        type: 'added',
        value: data2[key],
      };
    }
    if (!_.has(data2, key)) {
      return {
        key,
        type: 'removed',
        value: data1[key],
      };
    }
    return {
      key,
      type: 'updated',
      value1: data1[key],
      value2: data2[key],
    };
  });
  return diff;
};

export default buildDiff;
