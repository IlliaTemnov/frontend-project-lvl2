const stringify = (value) => {
  if (value === 'null') { return value; }
  if (typeof value === 'object') { return '[complex value]'; }
  if (typeof value === 'string') { return `'${value}'`; }
  return value;
};

const getPropertyName = (paths, key) => [...paths, key].join('.');

const genPlainFormat = (tree) => {
  const iter = (node, path) => {
    switch (node.type) {
      case 'root':
        return node.children.flatMap((child) => iter(child, path));
      case 'nested':
        return node.children.flatMap((child) => iter(child, [...path, node.key]));
      case 'added':
        return `Property '${getPropertyName(path, node.key)}' was added with value: ${stringify(node.value)}`;
      case 'removed':
        return `Property '${getPropertyName(path, node.key)}' was removed`;
      case 'unchanged':
        return [];
      case 'changed':
        return `Property '${getPropertyName(path, node.key)}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
      default:
        throw new Error(`Unexpected type ${node.type}`);
    }
  };
  return iter(tree, '').join('\n');
};

export default genPlainFormat;
