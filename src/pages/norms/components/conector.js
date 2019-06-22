/* eslint-disable react/no-array-index-key */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Chip } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Predicate from './predicate';
import { finders, getNewCriteria } from '../utils';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  spacer: {
    flex: 2,
  },
  symbol: {
    margin: theme.spacing(1),
  },
  symbolContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(1),
    alignItems: 'center',
  },
  addCriteria: {
    height: '25px',
    width: '25px',
    marginLeft: '4px',
    marginRight: '4px',
  },
  predicatesConector: {
    minWidth: '65px',
  },
  // NOT: {
  //   border: '1px solid #fca5a4',
  // },
  // IS: {
  //   border: '1px solid #afffb7',
  // },
  // AND: {
  //   border: '1px solid #6b6bff',
  // },
  // OR: {
  //   border: '1px solid #fb9eff',
  // },
  // IMPL: {
  //   border: '1px solid #d8ffaf',
  // },
  // DOUBLE_IMPL: {
  //   border: 'apx solid #f2ffbc',
  // },
}));

export default function Conector(props) {
  const classes = useStyles();
  const { predicates } = props;
  const { metadata } = props;
  const { onChange } = props;
  const { name } = metadata;
  const { antecedent, consequent } = metadata;
  const { predicate } = metadata;
  const conector = finders.findConector(predicates, metadata);

  function handleOnPredicateChange(index, newMetadata) {
    onChange({ ...metadata, predicates: metadata.predicates.map((_predicate, _index) => (_index === index ? newMetadata : _predicate)) });
  }

  function handleOnPredicateDelete(index) {
    if (metadata.predicates.length === 2) {
      onChange({ ...metadata.predicates[1 - index] });
    } else {
      onChange({ ...metadata, predicates: metadata.predicates.filter((_predicate, _index) => _index !== index) });
    }
  }

  function handleOnPredicateAdd() {
    onChange({ ...metadata, predicates: [...metadata.predicates, getNewCriteria()] });
  }

  function handleOnAntecedentChange(newAntecedent) {
    onChange({ ...metadata, antecedent: newAntecedent });
  }

  function handleOnAntecedentDelete() {
    onChange({ ...consequent });
  }

  function handleOnConsequentChange(newConsequent) {
    onChange({ ...metadata, consequent: newConsequent });
  }

  function handleOnConsequentDelete() {
    onChange({ ...antecedent });
  }

  function handleOnSinglePredicateChange(newPredicate) {
    onChange({ ...metadata, predicate: newPredicate });
  }

  function handleOnSinlgePredicateDelete() {
    onChange({ ...metadata.predicate });
  }

  return (
    <Paper className={classes.formControl}>
      {(name === 'IS' || name === 'NOT')
        && (
          <UnarySymbol conector={conector}>
            <Predicate predicates={predicates} metadata={predicate} onChange={handleOnSinglePredicateChange} onDelete={handleOnSinlgePredicateDelete} />
          </UnarySymbol>
        )}
      {(name === 'OR' || name === 'AND')
        && metadata.predicates.map((_predicate, index) => <Predicate key={_predicate.type + index} predicates={predicates} metadata={_predicate} onChange={newMetadata => handleOnPredicateChange(index, newMetadata)} onDelete={() => handleOnPredicateDelete(index)} />)
          .reduce((prev, next, index) => [prev, <Symbol key={index} onClick={handleOnPredicateAdd} conector={conector} />, next])}
      {(name === 'IMPL' || name === 'DOUBLE_IMPL')
        && (
          <span>
            <Predicate predicates={predicates} metadata={antecedent} onChange={handleOnAntecedentChange} onDelete={handleOnAntecedentDelete} />
            <Symbol conector={conector} />
            <Predicate predicates={predicates} metadata={consequent} onChange={handleOnConsequentChange} onDelete={handleOnConsequentDelete} />
          </span>
        )}
    </Paper>
  );
}

function Symbol(props) {
  const classes = useStyles();
  const { conector } = props;
  const { onClick } = props;

  function handleOnClick() {
    onClick();
  }

  return (
    <span className={classes.symbolContainer}>
      <div className={classes.spacer} />
      <Paper className={classes.predicatesConector}>
        <Typography variant="subtitle1" className={classes.symbol}>{conector.value}</Typography>
      </Paper>
      {conector.argumentType === 'list' && <Chip className={classes.addCriteria} variant="outlined" label="+" clickable onClick={handleOnClick} />}
      <div className={classes.spacer} />
    </span>
  );
}

function UnarySymbol(props) {
  const classes = useStyles();
  const { conector } = props;
  const { children } = props;

  return (
    <span className={classes.symbolContainer}>
      <Paper className={classes.predicatesConector}>
        <Typography variant="subtitle1" className={classes.symbol}>{conector.value}</Typography>
      </Paper>
      {children}
    </span>
  );
}
