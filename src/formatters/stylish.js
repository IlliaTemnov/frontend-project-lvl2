import _ from 'lodash';

const indent = (depth, spaces = 4) => ' '.repeat(depth + spaces);

const stringify = (data, depth) => {
  if (!_.isPlainObject(data)) {
    return data;
  }
  const output = _.map(data, (value, key) => `${indent(depth, 4)}${key}: ${stringify(value, depth + 4)}`);

  return `{\n${output.join('\n')}\n${indent(depth, 0)}}`;
};

const genStylishFormat = (tree) => {
  const addDepth = (nodes, depth) => {
    const output = nodes.flatMap((node) => {
      switch (node.type) {
        case 'nested':
          return `${indent(depth, 0)}  ${node.key}: ${addDepth(node.children, depth + 4)}`;
        case 'added':
          return `${indent(depth, 0)}+ ${node.key}: ${stringify(node.value, depth + 2)}`;
        case 'removed':
          return `${indent(depth, 0)}- ${node.key}: ${stringify(node.value, depth + 2)}`;
        case 'unchanged':
          return `${indent(depth, 0)}  ${node.key}: ${stringify(node.value, depth + 2)}`;
        case 'changed': {
          const { key, value1, value2 } = node;
          const data1 = `${indent(depth, 0)}- ${key}: ${stringify(value1, depth + 2)}`;
          const data2 = `${indent(depth, 0)}+ ${key}: ${stringify(value2, depth + 2)}`;
          return [data1, data2];
        }
        default:
          throw new Error(`Unexpected type ${node.type}`);
      }
    });

    return `{\n${output.join('\n')}\n${indent(depth - 2, 0)}}`;
  };
  return addDepth(tree, 2);
};

export default genStylishFormat;
