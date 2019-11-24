import React from 'react';
import PropTypes from 'prop-types';
import { TableHead, TableRow, TableCell, TableSortLabel } from '@material-ui/core';

const getOrderDirection = (header, appliedOrders) => {
  const order = appliedOrders.find(ord => ord.key === header.key);
  if (!order) {
    return false;
  }
  return order.order;
};

const getNewOrder = (header, order) => ([{ key: header.key, order }]);

const getInvertedOder = (order) => {
  if (!order || !order.order || order.order === 'asc') {
    return 'desc';
  }
  return 'asc';
};

export default function SortableHeader(props) {
  const { headers, availableOrders, appliedOrders, setOrders } = props;

  const changeOrder = header => () => {
    const headerOrderApplied = appliedOrders.find(order => order.key === header.key);
    setOrders(getNewOrder(header, getInvertedOder(headerOrderApplied)));
  };

  return (
    <TableHead>
      <TableRow>
        {headers.map((header) => {
          const orderDirection = getOrderDirection(header, appliedOrders);
          const canBeOrdered = !!availableOrders.find(order => order.key === header.key);
          if (canBeOrdered) {
            return (
              <TableCell key={header.key} sortDirection={orderDirection}>
                {orderDirection ? (
                  <TableSortLabel
                    active={!!orderDirection}
                    direction={orderDirection}
                    onClick={changeOrder(header)}
                  >
                    {header.value}
                  </TableSortLabel>
                ) : (
                  <TableSortLabel
                    onClick={changeOrder(header)}
                  >
                    {header.value}
                  </TableSortLabel>
                )}
              </TableCell>
            );
          }
          return (
            <TableCell key={header.key}>
              {header.value}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}

SortableHeader.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.shape({ key: PropTypes.string })).isRequired,
  availableOrders: PropTypes.arrayOf(PropTypes.shape({ key: PropTypes.string })).isRequired,
  appliedOrders: PropTypes.arrayOf(PropTypes.shape({ key: PropTypes.string, order: PropTypes.string })).isRequired,
  setOrders: PropTypes.func.isRequired,
};
