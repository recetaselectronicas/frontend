import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import propTypes from 'prop-types';

const Item = (props) => {
  const {
    quantity, id, removeItem, medicine,
  } = props;
  const { description } = medicine;
  const hasDeleteButton = !!removeItem;
  return (
    <ListItem button>
      <ListItemText primary={`${quantity} x ${description}`} />
      <ListItemSecondaryAction>
        {hasDeleteButton && (
          <IconButton edge="end" aria-label="Delete" onClick={() => removeItem(id)}>
            <DeleteIcon />
          </IconButton>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );
};

Item.defaultProps = {
  removeItem: false,
};

Item.propTypes = {
  quantity: propTypes.number.isRequired,
  id: propTypes.number.isRequired,
  removeItem: propTypes.oneOfType([propTypes.func, propTypes.bool]),
};


export default Item;
