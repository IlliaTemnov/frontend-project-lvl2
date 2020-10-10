import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (_.isString(value)) return `'${value}'`;
  return `${value}`;
};

const genPlain = (сomparedData, parent = '') => {
  const output = сomparedData.flatMap((node) => {
    switch (node.status) {
      case 'complex value':
        return genPlain(node.children, `${parent}${node.name}.`);
      case 'added':
        return `Property '${parent}${node.name}' was added with value: ${stringify(node.value)}`;
      case 'removed':
        return `Property '${parent}${node.name}' was removed`;
      case 'equal':
        return null;
      case 'updated':
        return `Property '${parent}${node.name}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
      default:
        throw new Error(`Unexpected status ${node.status}`);
    }
  });
  return output.filter((item) => item !== null).join('\n');
};

export default genPlain;
