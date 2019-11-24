import React from 'react';
import PropTypes from 'prop-types';
import { TextField, MenuItem } from '@material-ui/core';
import { getStatusTraduction, getStatisticTraduction } from '../StatisticsUtils';

export default function StatisticFilter(props) {
  const { filter, appliedFilters, onApplyFilter } = props;
  const actualFilter = appliedFilters.find(appliedFilter => appliedFilter.key === filter.key) || filter;
  actualFilter.value = actualFilter.value || '';

  const applyFilter = (event) => {
    event.preventDefault();
    const { value } = event.target;
    const newFilter = { ...actualFilter, value };
    onApplyFilter(newFilter);
  };

  if (filter.type === 'equal') {
    return (
      <>
        <TextField style={{ minWidth: '250px' }} value={actualFilter.value} label={getStatisticTraduction(actualFilter.key)} onChange={applyFilter} />
      </>
    );
  }
  if (filter.type === 'like') {
    return (
      <>
        <TextField style={{ minWidth: '250px' }} value={actualFilter.value} label={getStatisticTraduction(actualFilter.key)} onChange={applyFilter} />
      </>
    );
  }
  if (filter.type === 'in') {
    return (
      <>
        <TextField style={{ minWidth: '250px' }} select value={actualFilter.value || '-'} label={getStatisticTraduction(actualFilter.key)} onChange={applyFilter}>
          {['-'].concat(filter.availableValues).map(value => (
            <MenuItem key={value} value={value}>
              {filter.key === 'prescriptionStatus' ? getStatusTraduction(value) : value}
            </MenuItem>
          ))}
        </TextField>
      </>
    );
  }
  return (
    <>
      Invalid filter type
    </>
  );
}

StatisticFilter.propTypes = {
  filter: PropTypes.shape({ key: PropTypes.string, type: PropTypes.string, value: PropTypes.string }).isRequired,
  appliedFilters: PropTypes.arrayOf(PropTypes.shape({ key: PropTypes.string, type: PropTypes.string, value: PropTypes.string })).isRequired,
  onApplyFilter: PropTypes.func.isRequired,
};
