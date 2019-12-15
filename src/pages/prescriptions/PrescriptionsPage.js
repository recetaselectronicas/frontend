import React, { useEffect, useState } from 'react';

import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import './PrescriptionsPage.css';
import CssBaseline from '@material-ui/core/CssBaseline';

import PrescriptionsTable from './components/prescriptionsTable/PrescriptionsTable';
import PrescriptionService from '../../services/PrescriptionService';
import FiltersSection from './components/filtersSection/FiltersSection';

const PrescriptionsPage = (props) => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [filtersValue, setFilters] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    //  console.log(selectedFilters, 'selectedFilters');
    const filterRequest = {};
    selectedFilters.forEach((selectedFilter) => {
      const selected = filterRequest[selectedFilter.property];
      if (Array.isArray(selectedFilter.value)) {
        filterRequest[selectedFilter.property] = [...(selected || []), ...selectedFilter.value];
      } else {
        filterRequest[selectedFilter.property] = [...(selected || []), selectedFilter.value];
      }
    });
    // console.log('filterRequest', JSON.stringify(filterRequest));
    PrescriptionService.getPrescriptionsList(filterRequest).then(({ result, filters, orders }) => {
      setPrescriptions(result);
      if (!filtersValue) {
        setFilters({ filters, orders });
      }
    });
  }, [selectedFilters, filtersValue]);

  const goToPrescriptionDetail = (prescriptionId) => {
    props.history.push(`/receta/${prescriptionId}`);
  };
  const onSelectFilter = (filter) => {
    setSelectedFilters([...selectedFilters, filter]);
  };
  const applyUniqueFilter = (selectedFiltersState, filter) => {
    let filterIsInSelectedFilters = false;
    let newSelectedFilters = selectedFiltersState.map((selectedFilter) => {
      if (selectedFilter.property === filter.property) {
        filterIsInSelectedFilters = true;
        return filter;
      }
      return selectedFilter;
    });
    if (!filterIsInSelectedFilters) {
      newSelectedFilters = [...newSelectedFilters, filter];
    }
    return newSelectedFilters;
  };
  const onSelectDateFilter = (filters) => {
    const [dateFrom, dateTo] = filters;
    const selectedFilterWithDateFrom = applyUniqueFilter(selectedFilters, dateFrom);
    const fullSelectedFilters = applyUniqueFilter(selectedFilterWithDateFrom, dateTo);
    setSelectedFilters(fullSelectedFilters);
  };
  const onSelectUniqueFilter = (filter) => {
    const newSelectedFilters = applyUniqueFilter(selectedFilters, filter);
    setSelectedFilters(newSelectedFilters);
  };
  const removeSelectedFilter = (filter) => {
    const newSelectedFilters = selectedFilters.filter(
      selectedFilter => !(selectedFilter.property === filter.property && selectedFilter.value === filter.value),
    );
    setSelectedFilters(newSelectedFilters);
  };
  return (
    <Grid container component="main" className="page">
      <CssBaseline />
      <Grid item sm={2} xs={12} className="prescriptions-page__special-filters">
        <div>
          Filtros aplicados
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
            }}
          >
            {selectedFilters.map(selectedFilter => !selectedFilter.dontShow && (
            <Chip
              key={selectedFilter.label}
              label={`${selectedFilter.label}`}
              onDelete={() => removeSelectedFilter(selectedFilter)}
              style={{ margin: '3px' }}
            />
            ))}
          </div>
        </div>
        {filtersValue && <SpecialFilterSection {...filtersValue} onSelectFilter={onSelectFilter} />}
      </Grid>
      <Grid item sm={10} xs={12}>
        {filtersValue && (
          <FiltersSection
            {...filtersValue}
            onSelectUniqueFilter={onSelectUniqueFilter}
            onSelectFilter={onSelectFilter}
            selectedFilters={selectedFilters}
            onSelectDateFilter={onSelectDateFilter}
          />
        )}
        <div>
          <PrescriptionsTable
            prescriptions={prescriptions}
            goToPrescriptionDetail={goToPrescriptionDetail}
            onSelectFilter={onSelectUniqueFilter}
          />
        </div>
      </Grid>
    </Grid>
  );
};
const SpecialFilterSection = () => (
  <React.Fragment>
    {/* medicalInsurance && (
        <SpecialFilter
          title="Obras sociales"
          {...medicalInsurance}
          property={medicalInsurance.key}
          onSelectFilter={onSelectFilter}
        />
      ) */}
  </React.Fragment>
);
/* npmconst SpecialFilter = (props) => {
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
}; */

export default PrescriptionsPage;
