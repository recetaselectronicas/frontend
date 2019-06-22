/* eslint-disable no-prototype-builtins */
export const getNewCriteria = () => ({
  type: 'CRITERIA',
  entity: '',
  attribute: '',
  operator: '',
});

export const getResultingCriteria = (oldCriteria, newCriteria) => {
  const criteria = getNewCriteria();
  if (oldCriteria.type !== 'CRITERIA' || newCriteria.type !== 'CRITERIA') {
    return criteria;
  }
  // Cambio de entidad
  if (oldCriteria.entity !== newCriteria.entity) {
    criteria.entity = newCriteria.entity;
    return criteria;
  }
  // Cambio de attributo
  if (oldCriteria.attribute !== newCriteria.attribute) {
    criteria.entity = newCriteria.entity;
    criteria.attribute = newCriteria.attribute;
    if (oldCriteria.hasOwnProperty('quantifier')) {
      criteria.quantifier = oldCriteria.quantifier;
    }
    if (oldCriteria.hasOwnProperty('quantity')) {
      criteria.quantity = oldCriteria.quantity;
    }
    return criteria;
  }
  // Cambio de operador
  if (oldCriteria.operator !== newCriteria.operator) {
    criteria.entity = newCriteria.entity;
    criteria.attribute = newCriteria.attribute;
    criteria.operator = newCriteria.operator;
    if (oldCriteria.hasOwnProperty('quantifier')) {
      criteria.quantifier = oldCriteria.quantifier;
    }
    if (oldCriteria.hasOwnProperty('quantity')) {
      criteria.quantity = oldCriteria.quantity;
    }
    return criteria;
  }
  // Cambio de cuantificador
  if (oldCriteria.quantifier !== newCriteria.quantifier) {
    criteria.entity = newCriteria.entity;
    criteria.attribute = newCriteria.attribute;
    criteria.operator = newCriteria.operator;
    criteria.quantifier = newCriteria.quantifier;
    if (oldCriteria.hasOwnProperty('expectedValue')) {
      criteria.expectedValue = newCriteria.expectedValue;
    } else if (oldCriteria.hasOwnProperty('posibleValues')) {
      criteria.posibleValues = newCriteria.posibleValues;
    } else if (oldCriteria.hasOwnProperty('containedValue')) {
      criteria.containedValue = newCriteria.containedValue;
    }
    return criteria;
  }
  return newCriteria;
};

export function getConectorFromModel(conector, predicate) {
  const newConector = {
    type: 'CONECTOR',
    name: conector.conector,
  };
  newConector[conector.argumentName] = conector.argumentType === 'list' ? [predicate, getNewCriteria()] : predicate;
  if (conector.type === 'binary') {
    newConector[conector.secondArgumentName] = conector.secondArgumentType === 'list' ? [getNewCriteria(), getNewCriteria()] : getNewCriteria();
  }
  return newConector;
}

export const finders = {
  findOperator(predicates, metadata) {
    const operator = predicates.operators.find(_operator => _operator.operator === metadata.operator);
    return operator || '';
  },
  findCriteria(predicates, metadata) {
    const criteria = predicates.criterias.find(_criteria => _criteria.entity === metadata.entity);
    return criteria || '';
  },
  findAttribute(entity, metadata) {
    const attribute = entity && entity.attributes.find(_attribute => _attribute.attribute === metadata.attribute);
    return attribute || '';
  },
  findConector(predicates, metadata) {
    const conector = predicates && predicates.conectors.find(_conector => _conector.conector === metadata.name);
    return conector || '';
  },
  findQuantifier(predicates, metadata) {
    const quantifier = predicates && predicates.quantifiers.find(_quantifier => _quantifier.quantifier === metadata.quantifier);
    return quantifier || '';
  },
};
