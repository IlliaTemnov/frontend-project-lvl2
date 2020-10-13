const stringify = (value) => {
  if (value !== null) {
    if (typeof value === 'object') return '[complex value]';
    if (typeof value === 'string') return `'${value}'`;
  }
  return `${value}`;
};

const genPlainFormat = (diff, root = '') => {
  const output = diff.flatMap((node) => {
    switch (node.type) {
      case 'nested':
        return genPlainFormat(node.children, `${root}${node.key}.`);
      case 'added':
        return `Property '${root}${node.key}' was added with value: ${stringify(node.value)}`;
      case 'removed':
        return `Property '${root}${node.key}' was removed`;
      case 'equal':
        return [];
      case 'updated':
        return `Property '${root}${node.key}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
      default:
        throw new Error(`Unexpected type ${node.type}`);
    }
  });
  return output.join('\n');
};

export default genPlainFormat;
