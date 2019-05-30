import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Item from './components/item/Item';
import AddItemDialog from './components/addItemDialog/AddItemDialog';
import MedicamentService from '../../services/MedicamentService';

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
    minWidth: 120,
    justifyContent: 'flex-start',
  },
  button: {
    marginRight: 12,
  },
}));

const EmitRecipe = () => {
  const classes = useStyles();

  const [addItemDialogOpen, setVisibiltyOfAddItemDialog] = React.useState(
    false,
  );
  const [listItem, setListItem] = React.useState([]);

  const addItem = (item) => {
    const newListItem = [...listItem];
    newListItem.push({ ...item, id: listItem.length });
    setListItem(newListItem);
  };
  const removeItem = (id) => {
    const newListItem = listItem.filter(item => item.id !== id);
    setListItem(newListItem);
  };
  return (
    // TODO: agregar pasos entre los inputs
    <Grid container justify="center" spacing={3}>
      <Grid item xs={9}>
        <Paper className={classes.paper}>
          <div>
            <TextField
              id="standard-full-width"
              label="Institucion"
              placeholder="Complete con la institucion"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <div style={{ textAlign: 'left' }}>
              <FormControl className={classes.formControlObraSocial}>
                <InputLabel htmlFor="age-simple">Obra social</InputLabel>
                <Select
                  inputProps={{
                    name: 'age',
                    id: 'age-simple',
                  }}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>

            <TextField
              id="standard-full-width"
              label="Nro de afiliado"
              placeholder="Complete con NRO de afiliado"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <div style={{ textAlign: 'left', marginTop: 10, marginBottom: 10 }}>
              Nombre : Pepito Gonzalez - Categoria : 310
            </div>
          </div>
          <Typography
            style={{ textAlign: 'start' }}
            variant="h6"
            className={classes.title}
          >
            Medicamentos
          </Typography>
          <div>
            <List component="nav">
              {listItem.map(item => (
                <Item {...item} removeItem={removeItem} />
              ))}
            </List>
            <div
              style={{ textAlign: 'end', cursor: 'pointer' }}
              className="emit-recipe__add-item"
              onClick={() => setVisibiltyOfAddItemDialog(true)}
            >
              Agregar...
            </div>
          </div>
          <div>
            <TextField
              id="standard-full-width"
              label="Diagnostico"
              placeholder="Complete con el diagnostico del afiliado"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Grid container direction="row" justify="flex-end">
              <FormControlLabel
                control={<Checkbox checked value="checkedB" color="primary" />}
                labelPlacement="start"
                label="Tratamiento prolongado"
              />
            </Grid>

            <Grid container direction="row" justify="space-between">
              <div>Fecha</div>
              <div>
                Doctor : Gonzalo gras cantou
                <div>simulacion de la firma del doctor</div>
              </div>
            </Grid>
          </div>
        </Paper>
      </Grid>
      <Grid container justify="flex-end" xs={9}>
        <Button variant="contained" color="primary" className={classes.button}>
          Emitir
        </Button>
      </Grid>
      <AddItemDialog
        open={addItemDialogOpen}
        handleClose={() => setVisibiltyOfAddItemDialog(false)}
        addItem={addItem}
        searchMedicament={MedicamentService.searchMedicamentByName}
      />
    </Grid>
  );
};

export default EmitRecipe;
