const stringify = (value) => {
  if (value !== null);
  if (typeof value === 'object') return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;

  return `${value}`;
};

const genPlainFormat = (tree) => {
  const genPath = (node, path) => {
    const keyPath = [...path, node.key];
    switch (node.type) {
      case 'root':
      case 'nested':
        return node.children.flatMap((child) => genPath(child, keyPath)).join('\n');
      case 'added':
        return `Property '${keyPath.join('.').slice(1)}' was added with value: ${stringify(node.value)}`;
      case 'removed':
        return `Property '${keyPath.join('.').slice(1)}' was removed`;
      case 'unchanged':
        return [];
      case 'changed':
        return `Property '${keyPath.join('.').slice(1)}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
      default:
        throw new Error(`Unexpected type ${node.type}`);
    }
  };
  return genPath(tree, '');
};

export default genPlainFormat;
