import _ from 'lodash';

const indent = (depth, tab = '  ') => tab.repeat(depth);

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return data;
  }
  const output = _.map(data, (value, key) => `${indent(depth + 4)}${key}: ${stringify(value, depth + 2)}`);

  return `{\n${output.join('\n')}\n${indent(depth + 2)}}`;
};

const genStylish = (compareData, depth = 0) => {
  const output = compareData.flatMap((unit) => {
    switch (unit.status) {
      case 'node':
        return `${indent(depth)}    ${unit.name}: ${genStylish(unit.children, depth + 2)}`;
      case 'added':
        return `${indent(depth)}  + ${unit.name}: ${stringify(unit.value, depth)}`;
      case 'deleted':
        return `${indent(depth)}  - ${unit.name}: ${stringify(unit.value, depth)}`;
      case 'equal':
        return `${indent(depth)}    ${unit.name}: ${stringify(unit.value, depth)}`;
      case 'changed': {
        const { name, value1, value2 } = unit;
        const data1 = `${indent(depth)}  - ${name}: ${stringify(value1, depth)}`;
        const data2 = `${indent(depth)}  + ${name}: ${stringify(value2, depth)}`;
        return [data1, data2];
      }

      default:
        throw new Error(`Unexpected status ${unit.status}`);
    }
  });

  return `{\n${output.join('\n')}\n${indent(depth)}}`;
};

export default genStylish;
