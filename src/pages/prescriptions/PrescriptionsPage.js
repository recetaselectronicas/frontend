import React, { useEffect, useState } from 'react';

import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import './PrescriptionsPage.css';

import { Typography } from '@material-ui/core';
import PrescriptionsTable from './components/prescriptionsTable/PrescriptionsTable';
import PrescriptionService from '../../services/PrescriptionService';
import FiltersSection from './components/filtersSection/FiltersSection';

const PrescriptionsPage = (props) => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [filtersValue, setFilters] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    console.log(selectedFilters, 'selectedFilters');
    const filterRequest = {};
    selectedFilters.forEach((selectedFilter) => {
      const selected = filterRequest[selectedFilter.property];
      if (Array.isArray(selectedFilter.id)) {
        filterRequest[selectedFilter.property] = [...(selected || []), ...selectedFilter.id];
      } else {
        filterRequest[selectedFilter.property] = [...(selected || []), selectedFilter.id];
      }
    });
    console.log('filterRequest', JSON.stringify(filterRequest));
    PrescriptionService.getPrescriptionsList(filterRequest).then(({ result, filters, orders }) => {
      setPrescriptions(result);
      console.table(result);
      if (!filtersValue) {
        setFilters({ filters, orders });
      }
    });
  }, [selectedFilters]);

  const goToPrescriptionDetail = (prescriptionId) => {
    props.history.push(`/receta/${prescriptionId}`);
  };
  const onSelectFilter = (filter) => {
    setSelectedFilters([...selectedFilters, filter]);
    /* const newFilters = { ...filtersValue };
    console.log("newFilters",newFilters);
    console.log("filter", filter);
    newFilters.filters[filter.property].values = newFilters[filter.property].values.filter(value => value.id !== filter.id);
    console.log('que paso', newFilters);

    setFilters(newFilters); */
  };
  const removeSelectedFilter = (filter) => {
    const newSelectedFilters = selectedFilters.filter(
      selectedFilter => selectedFilter.property === filter.property && selectedFilter.id !== filter.id,
    );
    const newFilters = { ...filtersValue };

    newFilters[filter.property].values = [
      ...newFilters[filter.property].values,
      { id: filter.id, value: filter.value },
    ];
    console.log('que paso', newFilters);

    setFilters(newFilters);
    setSelectedFilters(newSelectedFilters);
  };
  return (
    <Grid container>
      <Grid item xs={2} className="prescriptions-page__special-filters">
        <div>
          Filtros aplicados
          <div>
            {selectedFilters.map(selectedFilter => (
              <Chip label={selectedFilter.value} onDelete={() => removeSelectedFilter(selectedFilter)} />
            ))}
          </div>
        </div>
        {filtersValue && <SpecialFilterSection {...filtersValue} onSelectFilter={onSelectFilter} />}
      </Grid>
      <Grid item xs={10}>
        {filtersValue && <FiltersSection {...filtersValue} onSelectFilter={onSelectFilter} />}
        <div>
          <PrescriptionsTable prescriptions={prescriptions} goToPrescriptionDetail={goToPrescriptionDetail} />
          {/* <List className={classes.listContainer}>
            {prescriptions.map(prescription => (
              <PrescriptionItem {...prescription} goToPrescriptionDetail={goToPrescriptionDetail} />
            ))}
          </List> */}
        </div>
      </Grid>
    </Grid>
  );
};
const SpecialFilterSection = (props) => {
  const { onSelectFilter, filters } = props;
  const { institution, medicalInsurance } = filters;
  return (
    <React.Fragment>
      <div>
        {institution && (
          <SpecialFilter
            title="Instituciones"
            {...institution}
            property={institution.key}
            onSelectFilter={onSelectFilter}
          />
        )}
      </div>
      {medicalInsurance && (
        <SpecialFilter
          title="Obras sociales"
          {...medicalInsurance}
          property={medicalInsurance.key}
          onSelectFilter={onSelectFilter}
        />
      )}
      <div>filtro Medicina</div>
    </React.Fragment>
  );
};
const SpecialFilter = (props) => {
  const { title, values, property } = props;
  return (
    <div>
      <Typography>
        {title}
        {' '}
:
      </Typography>
      <div style={{ paddingLeft: '1em', marginBottom: '8px' }}>
        {values.map(({ value, id }) => (
          <div
            style={{ cursor: 'pointer', marginBottom: '8px' }}
            onClick={() => {
              props.onSelectFilter({ property, value, id });
            }}
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrescriptionsPage;
