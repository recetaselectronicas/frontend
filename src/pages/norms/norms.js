/* eslint-disable react/no-array-index-key */
import React from 'react';
import qs from 'query-string';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button, Container, Grid, Paper, Divider, Typography, Chip, Avatar, IconButton,
} from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import Rule from './components/rule';
import { useNorm } from './hooks';
import { getNewRule, deepCopy } from './utils';
import NormService from '../../services/NormService';
import SnackbarWrapper from '../../components/snackbarWrapper/SnackbarWrapper';

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: '150px',
    minHeigth: '150px',
  },
  statusContainer: {
    margin: theme.spacing(2),
  },
  actionContainer: {
    margin: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const NormStatus = withStyles({
  root: {
    height: '150px',
    width: '150px',
    borderRadius: '50%',
  },
})(Button);

const snackbarInitialState = { open: false, variant: 'error', message: '' };

export default function Norm(props) {
  const classes = useStyles();
  const { location } = props;
  const { search } = location;
  const qsParsed = qs.parse(search, { ignoreQueryPrefix: true });
  const [norm, setNorm] = React.useState('');
  const [oldNorm, setOldNorm] = useNorm();
  const [canModify, setCanModify] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState(snackbarInitialState);


  React.useEffect(() => {
    if (oldNorm) {
      setNorm(deepCopy(oldNorm));
    }
  }, [oldNorm]);

  function handleCancel() {
    setNorm(deepCopy(oldNorm));
    setCanModify(false);
  }

  function handleConfirm(newNorm) {
    NormService.saveNorm(newNorm)
      .then((createdNorm) => {
        setOldNorm(deepCopy(createdNorm));
        setCanModify(false);
        setSnackbar({
          open: true,
          message: 'Norma actualizada correctamente',
          variant: 'success',
        });
      })
      .catch(() => {
        setSnackbar({
          open: true,
          // message: (err.response && err.response.data.message) || err.message,
          message: 'Error al grabar la norma. Revise que todas las reglas estén completas',
          variant: 'error',
        });
      });
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  function handleCanModify() {
    setCanModify(true);
  }

  return (
    <>
      <Container maxWidth="lg" fixed>
        <Paper style={{ padding: '16px' }}>
          <Grid container justify="flex-end" alignItems="baseline" className={classes.actionContainer}>
            <Button variant="contained" color="primary" onClick={handleCanModify} disabled={canModify} className={classes.button}>Modificar</Button>
          </Grid>
          {norm && <ModificableNorm debug={qsParsed.debug === 'true'} norm={norm} canModify={canModify} onCancel={handleCancel} onConfirm={handleConfirm} />}
        </Paper>
      </Container>
      <SnackbarWrapper
        vertical="bottom"
        horizontal="center"
        open={snackbar.open}
        onClose={handleCloseSnackbar}
        variant={snackbar.variant}
        message={snackbar.message}
      />
    </>
  );
}

function ModificableNorm(props) {
  const classes = useStyles();
  const { onCancel, onConfirm } = props;
  const { debug } = props;
  const { norm } = props;
  const { canModify } = props;
  const [states, setStates] = React.useState(norm.states);
  const [activeState, setActiveState] = React.useState('');

  React.useEffect(() => {
    setStates(norm.states);
  }, [norm]);

  React.useEffect(() => {
    setActiveState(activeState || states[0] || '');
  }, [states, activeState]);

  function handleStatusChange(_state) {
    setActiveState(_state);
  }

  function handleConfirmChanges() {
    onConfirm({ ...norm, states });
  }

  function handleCancelChanges() {
    onCancel();
  }

  function handleAddRule() {
    states.find(state => state.state === activeState.state).rules.push(getNewRule());
    setStates(deepCopy(states));
  }

  function handleDeleteRule(index) {
    const state = states.find(_state => _state.state === activeState.state);
    delete state.rules.splice(index, 1);
    setStates(deepCopy(states));
  }

  function handleOnUpdateRule(index, newRule) {
    states.find(state => state.state === activeState.state).rules[index] = newRule;
    setStates(deepCopy(states));
  }

  function handleOnCancelRule() {
    setStates(deepCopy(states));
  }

  return (
    // <Paper style={{ padding: '16px' }}>
    //   <Grid container justify="flex-end" alignItems="baseline" className={classes.actionContainer}>
    //     <Button variant="contained" color="primary" onClick={handleCanModify} disabled={canModify} className={classes.button}>Modificar</Button>
    //   </Grid>
    <>
      <Grid container justify="space-evenly" alignItems="flex-end" className={classes.statusContainer}>
        {states && states.map(_state => <NormStatus key={_state.state} variant="contained" color={activeState.state === _state.state ? 'primary' : 'default'} onClick={() => handleStatusChange(_state)}>{_state.value}</NormStatus>)}
      </Grid>
      {activeState
        && (
          <Grid item xs={12}>
            <Paper style={{ padding: '8px' }}>
              <Typography style={{ margin: '8px' }} variant="h6">{`Estado: ${activeState.value}`}</Typography>
              <Divider />
              {states.find(state => state.state === activeState.state).rules.map(
                (_rule, index) => (
                  <Grid key={_rule.name + index} container justify="space-evenly" alignItems="center">
                    <Grid item xs={11}>
                      <Rule
                        updatable={canModify}
                        debug={debug}
                        rule={deepCopy(_rule)}
                        title={(canModify && 'Editar Regla') || 'Ver Regla'}
                        onSave={newRule => handleOnUpdateRule(index, newRule)}
                        onCancel={handleOnCancelRule}
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <IconButton aria-label="Delete" onClick={() => handleDeleteRule(index)} disabled={!canModify}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Grid>
                  </Grid>
                ),
              )}
              {canModify && <Chip avatar={<Avatar><AddCircle /></Avatar>} label="Agregar regla" variant="outlined" onClick={handleAddRule} className={classes.button} />}
            </Paper>
          </Grid>
        )}
      <Grid container justify="flex-end" className={classes.actionContainer}>
        <Button className={classes.button} variant="contained" color="primary" onClick={handleConfirmChanges} disabled={!canModify}>Confirmar</Button>
        <Button className={classes.button} variant="contained" color="secondary" onClick={handleCancelChanges} disabled={!canModify}>Cancelar</Button>
      </Grid>
    </>
    // </Paper>
  );
}
