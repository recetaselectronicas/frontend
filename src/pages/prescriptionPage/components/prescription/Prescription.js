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
  } = props;
  const classes = useStyles();

  const noItemsAdded = items.length === 0;
  return (
    <Paper className={classes.paper}>
      <div style={{ textAlign: 'start' }}>
        <div>
          <Typography style={{ fontSize: 20 }}>
            - Institucion:
            {institution.description}
          </Typography>
        </div>
        <div>
          <Typography style={{ fontSize: 20 }}>
            - Obra social:
            {medicalInsurance.description}
          </Typography>
        </div>
        <div>
          <Typography style={{ fontSize: 20 }}> - Afiliado </Typography>
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
      <Typography style={{ textAlign: 'start' }} variant="h6" className={classes.title}>
        Medicamentos
      </Typography>
      <div>
        <List component="nav">
          {noItemsAdded && <Paper style={{ padding: 25 }}>Aun no tiene items agregados</Paper>}
          {items.map(({ id, prescribed: { quantity, medicine } }) => (
            <ListItem style={{ border: '1px solid black', marginBottom: 8 }}>
              <ListItemText primary={`${quantity} x ${medicine.description}`} />
              <ListItemSecondaryAction>
                {actionButtonItems && (
                  <Button color="primary" onClick={() => actionButtonItems.onClick(id)}>
                    {actionButtonItems.label}
                  </Button>
                )}
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
      <div>
        <div style={{ textAlign: 'start' }}>
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
Fecha :
              {issuedDate}
            </span>
          </div>
          <div>
            Doctor :
            {doctor.name}
            {doctor.lastName}
            <div>
              <img
                width="100"
                src="https://upload.wikimedia.org/wikipedia/commons/7/7d/Marcela_Vacarezza_firma.png"
                alt=""
              />
            </div>
          </div>
        </Grid>
      </div>
    </Paper>
  );
};
export default Prescription;
