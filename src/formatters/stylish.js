import _ from 'lodash';

const startIndent = 2;
const indent = (depth, spaces = 4) => ' '.repeat(depth === 0 ? startIndent : startIndent + depth * spaces);

const stringify = (data, depth) => {
  if (!_.isPlainObject(data)) {
    return data;
  }
  const output = _.map(data, (value, key) => `${indent(depth + 1)}  ${key}: ${stringify(value, depth + 1)}`);

  return `{\n${output.join('\n')}\n${indent(depth)}  }`;
};

const genStylishFormat = (tree) => {
  const addDepth = (nodes, depth = 0) => {
    const output = nodes.flatMap((node) => {
      switch (node.type) {
        case 'nested':
          return `${indent(depth)}  ${node.key}: {\n${addDepth(node.children, depth + 1)}\n${indent(depth)}  }`;
        case 'added':
          return `${indent(depth)}+ ${node.key}: ${stringify(node.value, depth)}`;
        case 'removed':
          return `${indent(depth)}- ${node.key}: ${stringify(node.value, depth)}`;
        case 'unchanged':
          return `${indent(depth)}  ${node.key}: ${stringify(node.value, depth)}`;
        case 'changed': {
          const { key, value1, value2 } = node;
          const data1 = `${indent(depth)}- ${key}: ${stringify(value1, depth)}`;
          const data2 = `${indent(depth)}+ ${key}: ${stringify(value2, depth)}`;
          return [data1, data2];
        }
        default:
          throw new Error(`Unexpected type ${node.type}`);
      }
    });
    return output.join('\n');
  };
  return `{\n${addDepth(tree)}\n}`;
};

export default genStylishFormat;
