import _ from 'lodash';

const indent = (depth, num = 0) => {
  const tab = '  ';
  return tab.repeat(depth + num);
};

const stringify = (data, depth) => {
  if (!_.isPlainObject(data)) {
    return data;
  }
  const output = _.map(data, (value, key) => `${indent(depth, 4)}${key}: ${stringify(value, depth + 2)}`);

  return `{\n${output.join('\n')}\n${indent(depth, 2)}}`;
};

const genStylishFormat = (tree) => {
  const addDepth = (nodes, depth) => {
    const output = nodes.flatMap((node) => {
      switch (node.type) {
        case 'nested':
          return `${indent(depth, 1)}  ${node.key}: ${addDepth(node.children, depth + 2)}`;
        case 'added':
          return `${indent(depth, 1)}+ ${node.key}: ${stringify(node.value, depth)}`;
        case 'removed':
          return `${indent(depth, 1)}- ${node.key}: ${stringify(node.value, depth)}`;
        case 'unchanged':
          return `${indent(depth, 1)}  ${node.key}: ${stringify(node.value, depth)}`;
        case 'changed': {
          const { key, value1, value2 } = node;
          const data1 = `${indent(depth, 1)}- ${key}: ${stringify(value1, depth)}`;
          const data2 = `${indent(depth, 1)}+ ${key}: ${stringify(value2, depth)}`;
          return [data1, data2];
        }
        default:
          throw new Error(`Unexpected type ${node.type}`);
      }
    });

    return `{\n${output.join('\n')}\n${indent(depth)}}`;
  };
  return addDepth(tree, 0);
};

export default genStylishFormat;
