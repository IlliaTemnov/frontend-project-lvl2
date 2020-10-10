import _ from 'lodash';

const indent = (depth, tab = '  ') => tab.repeat(depth);

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return data;
  }
  const output = _.map(data, (value, key) => `${indent(depth + 4)}${key}: ${stringify(value, depth + 2)}`);

  return `{\n${output.join('\n')}\n${indent(depth + 2)}}`;
};

const genStylish = (comparedData, depth = 0) => {
  const output = comparedData.flatMap((node) => {
    switch (node.status) {
      case 'complex value':
        return `${indent(depth)}    ${node.name}: ${genStylish(node.children, depth + 2)}`;
      case 'added':
        return `${indent(depth)}  + ${node.name}: ${stringify(node.value, depth)}`;
      case 'removed':
        return `${indent(depth)}  - ${node.name}: ${stringify(node.value, depth)}`;
      case 'equal':
        return `${indent(depth)}    ${node.name}: ${stringify(node.value, depth)}`;
      case 'updated': {
        const { name, value1, value2 } = node;
        const data1 = `${indent(depth)}  - ${name}: ${stringify(value1, depth)}`;
        const data2 = `${indent(depth)}  + ${name}: ${stringify(value2, depth)}`;
        return [data1, data2];
      }
      default:
        throw new Error(`Unexpected status ${node.status}`);
    }
  });

  return `{\n${output.join('\n')}\n${indent(depth)}}`;
};

export default genStylish;
