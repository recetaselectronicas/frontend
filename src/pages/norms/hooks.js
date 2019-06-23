import React from 'react';
import NormService from '../../services/NormService';

export function usePredicates() {
  const [predicates, setPredicates] = React.useState('');

  React.useEffect(() => {
    NormService.getDefinition()
      .then((definition) => {
        setPredicates(definition);
      });
  }, []);

  return predicates;
}

export function useNorm() {
  const [norm, setNorm] = React.useState('');

  React.useEffect(() => {
    NormService.getNorm()
      .then((_norm) => {
        setNorm(_norm);
      });
  }, []);

  return [norm, setNorm];
}
