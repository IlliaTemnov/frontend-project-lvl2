import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (_.isString(value)) return `'${value}'`;
  return `${value}`;
};

const genPlain = (сomparedData, parent = '') => {
  const output = сomparedData.flatMap((unit) => {
    switch (unit.status) {
      case 'equal':
        return null;
      case 'complex value':
        return genPlain(unit.children, `${parent}${unit.name}.`);
      case 'added':
        return `Property '${parent}${unit.name}' was added with value: ${stringify(unit.value)}`;
      case 'removed':
        return `Property '${parent}${unit.name}' was removed`;
      case 'updated':
        return `Property '${parent}${unit.name}' was updated. From ${stringify(unit.value1)} to ${stringify(unit.value2)}`;
      default:
        throw new Error(`Unexpected status ${unit.status}`);
    }
  });
  return output.filter((item) => item !== null).join('\n');
};

export default genPlain;
