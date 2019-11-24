import React, { useState, useEffect } from 'react';
import { Container, Paper, Table, TableRow, TableCell, TableBody, Grid, Typography, Button } from '@material-ui/core';
import { saveAs } from 'file-saver';
import PrescriptionService from '../../services/PrescriptionService';
import SortableHeader from './components/SortableHeader';
import { rows, getStatusTraduction, getNewDebouncer } from './StatisticsUtils';
import StatisticFilter from './components/StatisticFilter';

let updateStatisticsWithDebounce = getNewDebouncer(() => {});

export default function StatisticsPage() {
  const [results, setResults] = useState([]);
  const [availableFilters, setAvailableFilters] = useState([]);
  const [availableOrders, setAvailableOrders] = useState([]);
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [appliedOrders, setAppliedOrders] = useState([]);

  useEffect(() => {
    const updateStatistics = (filters, order) => {
      PrescriptionService.getStatistics({ appliedFilters: filters, appliedOrders: order })
        .then((res) => {
          setResults(res.results);
          setAvailableFilters(res.availableFilters);
          setAvailableOrders(res.availableOrders);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    updateStatisticsWithDebounce = getNewDebouncer(updateStatistics);
    updateStatistics([], [], true);
    return updateStatisticsWithDebounce.clearPendingDebounce;
  }, []);

  const applyOrder = (order) => {
    updateStatisticsWithDebounce.execute(appliedFilters, order, 50);
    setAppliedOrders(order);
  };

  const applyFilters = (filters) => {
    updateStatisticsWithDebounce.execute(filters, appliedOrders);
    setAppliedFilters(filters);
  };

  const applyFilter = (filter) => {
    const newFilter = { ...availableFilters.find(filt => filt.key === filter.key), value: filter.value };
    const newFilters = appliedFilters.filter(filt => filt.key !== filter.key);
    newFilters.push(newFilter);
    applyFilters(newFilters);
  };

  const downloadStatistics = (type) => {
    PrescriptionService.downloadStatistics(type, { appliedFilters, appliedOrders })
      .then((res) => {
        const blob = new Blob([type === 'json' ? JSON.stringify(res.data, null, 4) : res.data], { type: res.headers['content-type'] });
        saveAs(blob, `prescription_statistics.${type}`);
      })
      .catch(err => console.error(err));
  };

  return (
    <>
      <Container maxWidth="lg" fixed style={{ padding: '16px' }}>
        <Paper style={{ padding: '16px', marginBottom: '8px' }}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h5">Filtros</Typography>
            </Grid>
            {availableFilters.map(availableFilter => (
              <Grid key={availableFilter.key} item xs={12} sm={6} md={4} lg={3}>
                <StatisticFilter filter={availableFilter} appliedFilters={appliedFilters} onApplyFilter={applyFilter} />
              </Grid>
            ))}
          </Grid>
        </Paper>
        <Paper style={{ padding: '16px', marginBottom: '8px' }}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h5" style={{ marginBottom: '8px' }}>Resultados</Typography>
            </Grid>
            <Grid item xs={12} style={{ overflow: 'scroll', maxHeight: '500px' }}>
              <Table size="small" stickyHeader style={{ minWidth: 'max-content', marginBottom: '8px' }}>
                <SortableHeader headers={rows} availableOrders={availableOrders} appliedOrders={appliedOrders} setOrders={applyOrder} />
                <TableBody>
                  {results.map(result => (
                    <TableRow hover key={result.itemId}>
                      {rows.filter(row => row.visible).map(row => (
                        <TableCell key={row.key}>{(row.key === 'prescriptionStatus' ? getStatusTraduction(result[row.key]) : result[row.key]) || '-'}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </Paper>
        <Paper style={{ padding: '16px', marginBottom: '8px' }}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h5">Descargas</Typography>
            </Grid>
            <Grid container item justify="flex-end">
              <Grid item>
                <Typography variant="button">
                  Descargar como
                  {['csv', 'xml', 'json'].map(type => (
                    <Button key={type} color="primary" variant="outlined" onClick={() => downloadStatistics(type)} style={{ margin: '8px' }}>{type}</Button>
                  ))}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
}
