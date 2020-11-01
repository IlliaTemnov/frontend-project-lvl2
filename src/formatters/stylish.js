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
  const iter = (node, depth = 0) => {
    const output = () => node.children.flatMap((child) => iter(child, depth + 1)).join('\n');
    switch (node.type) {
      case 'root':
        return `{\n${output()}\n}`;
      case 'nested':
        return `${indent(depth)}  ${node.key}: {\n${output()}\n${indent(depth)}  }`;
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
  return iter(tree);
};

export default genStylishFormat;
