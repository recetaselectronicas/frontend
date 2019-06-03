import React, { useEffect, useState } from 'react';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import './PrescriptionsPage.css';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Search from '@material-ui/icons/Search';
import PrescriptionItem from './components/prescription/Prescription';
import PrescriptionService from '../../services/PrescriptionService';

const useStyles = makeStyles(theme => ({
  listContainer: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

const PrescriptionsPage = (props) => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [filters, setFilters] = useState(null);
  const [selectedStates, setSelectedStates] = useState([]);
  const classes = useStyles();

  // componentDidMount
  useEffect(() => {
    console.log('go');
    PrescriptionService.getPrescriptionsList().then((data) => {
      setPrescriptions(data.result);
      setFilters(data.filters);
    });
  }, []);

  const goToPrescriptionDetail = (prescriptionId) => {
    props.history.push(`/receta/${prescriptionId}`);
  };

  return (
    <Grid container>
      <Grid item xs={3} className="prescriptions-page__special-filters" />
      <Grid item xs={9}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginBottom: '0.5em',
          }}
        >
          <div style={{ marginRight: '12px' }}>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <Search />
              </Grid>
              <Grid item>
                <TextField id="input-with-icon-grid" label="Receta ID" />
              </Grid>
            </Grid>
          </div>
          {filters && (
            <FormControl>
              <InputLabel htmlFor="select-multiple-chip">Estados</InputLabel>
              <Select
                multiple
                value={selectedStates}
                onChange={(event) => {
                  setSelectedStates(event.target.value);
                }}
                inputProps={{
                  name: 'age',
                  id: 'select-multiple-chip',
                }}
                style={{ minWidth: '80px' }}
                input={<Input id="select-multiple-chip" />}
                renderValue={selected => (
                  <div className={classes.chips}>
                    {selected.map(value => (
                      <Chip key={value} label={value} className={classes.chip} />
                    ))}
                  </div>
                )}
              >
                {filters.singles.status.values.map(state => (
                  <MenuItem key={state.id} value={state.id}>
                    {state.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </div>
        <div>
          <List className={classes.listContainer}>
            {prescriptions.map(prescription => (
              <PrescriptionItem {...prescription} goToPrescriptionDetail={goToPrescriptionDetail} />
            ))}
          </List>
        </div>
      </Grid>
    </Grid>
  );
};

export default PrescriptionsPage;
