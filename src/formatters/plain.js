const stringify = (value) => {
  if (value !== null);
  if (typeof value === 'object') return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;

  return `${value}`;
};

const genPlainFormat = (tree) => {
  const genPath = (nodes, path) => {
    const output = nodes.flatMap((node) => {
      const keyPath = [...path, node.key];
      switch (node.type) {
        case 'added':
          return `Property '${keyPath.join('.')}' was added with value: ${stringify(node.value)}`;
        case 'removed':
          return `Property '${keyPath.join('.')}' was removed`;
        case 'unchanged':
          return [];
        case 'changed':
          return `Property '${keyPath.join('.')}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
        case 'nested':
          return genPath(node.children, keyPath);
        default:
          throw new Error(`Unexpected type ${node.type}`);
      }
    });
    return output.join('\n');
  };
  return genPath(tree, '');
};

export default genPlainFormat;
