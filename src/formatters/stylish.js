import _ from 'lodash';

const indent = (depth, spaces = 4) => ' '.repeat(depth * spaces - 2);

const stringify = (data, depth) => {
  if (!_.isPlainObject(data)) {
    return data;
  }
  const output = _.map(data, (value, key) => `${indent(depth + 1)}  ${key}: ${stringify(value, depth + 1)}`);

  return `{\n${output.join('\n')}\n${indent(depth)}  }`;
};

const genStylishFormat = (tree) => {
  const addDepth = (node, depth = 0) => {
    switch (node.type) {
      case 'root':
        return `{\n${node.children.flatMap((child) => addDepth(child, depth + 1)).join('\n')}\n}`;
      case 'nested':
        return `${indent(depth)}  ${node.key}: {\n${node.children.flatMap((child) => addDepth(child, depth + 1)).join('\n')}\n${indent(depth)}  }`;
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
  };
  return addDepth(tree);
};

export default genStylishFormat;
