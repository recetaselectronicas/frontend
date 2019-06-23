import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import propTypes from 'prop-types';

const Suggestion = (props) => {
  const { data } = props;
  return (
    <MenuItem component="div" onClick={() => props.onSelectSuggestion(data)}>
      {data.description}
    </MenuItem>
  );
};
Suggestion.propTypes = {
  data: propTypes.shape({}).isRequired,
  onSelectSuggestion: propTypes.func.isRequired,
};

export default Suggestion;
