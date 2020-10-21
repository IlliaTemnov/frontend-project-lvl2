const stringify = (value) => {
  if (value !== null);
  if (typeof value === 'object') return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;

  return `${value}`;
};

const buildPropertyName = (root, key) => `${root}${key}`;

const genPlainFormat = (tree) => {
  const genRoot = (subTree, root) => {
    const output = subTree.flatMap((node) => {
      switch (node.type) {
        case 'nested':
          return genRoot(node.children, `${buildPropertyName(root, node.key)}.`);
        case 'added':
          return `Property '${buildPropertyName(root, node.key)}' was added with value: ${stringify(node.value)}`;
        case 'removed':
          return `Property '${buildPropertyName(root, node.key)}' was removed`;
        case 'not changed':
          return [];
        case 'changed':
          return `Property '${buildPropertyName(root, node.key)}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
        default:
          throw new Error(`Unexpected type ${node.type}`);
      }
    });
    return output.join('\n');
  };
  return genRoot(tree, '');
};

export default genPlainFormat;
