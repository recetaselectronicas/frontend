import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import propTypes from 'prop-types';

const Item = (props) => {
  const { quantity, item, id } = props;
  return (
    <ListItem button>
      <ListItemText primary={`${quantity} x ${item.label}`} />
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="Delete"
          onClick={() => props.removeItem(id)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

Item.propTypes = {
  quantity: propTypes.number.isRequired,
  item: propTypes.shape({
    label: propTypes.string.isRequired,
  }).isRequired,
  id: propTypes.number.isRequired,
  removeItem: propTypes.func.isRequired,
};

export default Item;
