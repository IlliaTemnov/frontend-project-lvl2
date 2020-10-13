import _ from 'lodash';

const indent = (depth, tab = '  ') => tab.repeat(depth);

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return data;
  }
  const output = _.map(data, (value, key) => `${indent(depth + 4)}${key}: ${stringify(value, depth + 2)}`);

  return `{\n${output.join('\n')}\n${indent(depth + 2)}}`;
};

const genStylishFormat = (diff) => {
  const addDepth = (tree, depth) => {
    const output = tree.flatMap((node) => {
      switch (node.type) {
        case 'nested':
          return `${indent(depth)}    ${node.key}: ${addDepth(node.children, depth + 2)}`;
        case 'added':
          return `${indent(depth)}  + ${node.key}: ${stringify(node.value, depth)}`;
        case 'removed':
          return `${indent(depth)}  - ${node.key}: ${stringify(node.value, depth)}`;
        case 'equal':
          return `${indent(depth)}    ${node.key}: ${stringify(node.value, depth)}`;
        case 'updated': {
          const { key, value1, value2 } = node;
          const data1 = `${indent(depth)}  - ${key}: ${stringify(value1, depth)}`;
          const data2 = `${indent(depth)}  + ${key}: ${stringify(value2, depth)}`;
          return [data1, data2];
        }
        default:
          throw new Error(`Unexpected type ${node.type}`);
      }
    });

    return `{\n${output.join('\n')}\n${indent(depth)}}`;
  };
  return addDepth(diff, 0);
};

export default genStylishFormat;
