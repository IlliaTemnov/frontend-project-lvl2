import _ from 'lodash';

const compareData = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2)).sort();
  const comparedData = keys.map((key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return {
        name: key,
        status: 'node',
        children: compareData(data1[key], data2[key]),
      };
    }
    if (data1[key] === data2[key]) {
      return {
        name: key,
        status: 'equal',
        value: data2[key],
      };
    }
    if (!_.has(data1, key)) {
      return {
        name: key,
        status: 'added',
        value: data2[key],
      };
    }
    if (!_.has(data2, key)) {
      return {
        name: key,
        status: 'deleted',
        value: data1[key],
      };
    }
    return {
      name: key,
      status: 'changed',
      value1: data1[key],
      value2: data2[key],
    };
  });

  return comparedData;
};

export default compareData;
