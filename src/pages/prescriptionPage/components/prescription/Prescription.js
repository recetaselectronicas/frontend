import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: '2em',
    paddingTop: '1em',
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  formControlObraSocial: {
    marginBottom: 8,
  },
  button: {
    marginRight: 12,
  },
  title: {
    color: 'black',
    marginTop: '5px',
    fontSize: 20,
  },
  issuedErrors: {
    margin: theme.spacing(0),
    color: theme.palette.error.dark,
    textAlign: 'left',
  },
  errorsDivider: {
    margin: theme.spacing(1),
  },
}));

const Prescription = (props) => {
  const {
    items,
    medicalInsurance,
    affiliate,
    institution,
    diagnosis,
    issuedDate,
    doctor,
    prolongedTreatment,
    actionButtonItems,
    status,
    actionErrors,
  } = props;

  const classes = useStyles();
  const noItemsAdded = items.length === 0;
  return (
    <Paper className={classes.paper}>
      <div style={{ textAlign: 'end' }}>
        <Typography style={{ fontSize: 20 }}>
Estado :
          {` ${status}`}
        </Typography>
      </div>
      <div style={{ textAlign: 'start' }}>
        <div>
          <Typography style={{ fontSize: 20, color: 'black' }} gutterBottom variant="h4">
            Institucion:
            {' '}
            {institution.description}
          </Typography>
        </div>
        <div>
          <Typography style={{ fontSize: 20, color: 'black' }} gutterBottom variant="h4">
            Obra social:
            {' '}
            {medicalInsurance.description}
          </Typography>
        </div>
        <Divider />

        <div style={{ marginTop: '8px', marginBottom: '8px' }}>
          <Typography style={{ fontSize: 20, color: 'black' }} gutterBottom variant="h4">
            {' '}
            Afiliado
            {' '}
          </Typography>
          Numero:
          {affiliate.code}
          <br />
          Nombre :
          {affiliate.name}
          {' '}
          {affiliate.surname}
          <br />
          Plan :
          {' '}
          {affiliate.plan.description}
          {' '}
-
          {' '}
          {affiliate.category}
        </div>
      </div>
      <Divider />

      <Typography style={{ textAlign: 'start' }} variant="h4" gutterBottom className={classes.title}>
        Medicamentos
      </Typography>
      <div>
        <List component="nav">
          {noItemsAdded ? <Paper style={{ padding: 25 }}>Aun no tiene items agregados</Paper> : <Divider />}
          {items.map((item) => {
            const {
              id,
              prescribed: { quantity, medicine },
            } = item;
            return (
              <React.Fragment>
                <ListItem button>
                  <ListItemText primary={`${quantity} x ${medicine.description}`} />
                  <ListItemSecondaryAction>
                    {actionButtonItems && (
                      <Button
                        color="primary"
                        onClick={() => actionButtonItems.onClick(id)}
                        disabled={actionButtonItems.isDisabled(item)}
                      >
                        {actionButtonItems.label}
                      </Button>
                    )}
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </React.Fragment>
            );
          })}
        </List>
      </div>
      <div>
        <div style={{ textAlign: 'start', marginTop: '8px' }}>
          <Typography style={{ fontSize: 20 }}>
            Diagnostico:
            {diagnosis}
          </Typography>
        </div>

        <Grid container direction="row" justify="flex-end">
          <FormControlLabel
            control={<Checkbox color="primary" checked={prolongedTreatment} />}
            labelPlacement="start"
            label="Tratamiento prolongado"
            disabled
          />
        </Grid>
        <Grid container direction="row" justify="space-between">
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <span>
              Fecha:
              {` ${issuedDate}`}
            </span>
          </div>
          <div>
            <div style={{ fontFamily: 'Monsieur La Doulaise', transform: 'rotate(-20deg)', fontSize: '2rem', marginBottom: '2rem', marginTop: '1rem' }}>
              <div>{` ${doctor.name} ${doctor.lastName}`}</div>
            </div>
            Doctor :
            {` ${doctor.name} ${doctor.lastName}`}
          </div>
        </Grid>
      </div>
      {actionErrors.length > 0
          && (
          <>
            <Divider className={classes.errorsDivider} />
            <Grid container>
              {actionErrors.map(error => (
                <Grid item xs={12} className={classes.issuedErrors} justify="flex-start">
                  <Typography variant="subtitle1">{`• ${error.message}`}</Typography>
                </Grid>
              ))}
            </Grid>
          </>
          )}
    </Paper>
  );
};
export default Prescription;
