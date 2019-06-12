import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const headRows = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: 'Id',
  },
  {
    id: 'issuedDate',
    numeric: true,
    disablePadding: false,
    label: 'Fecha emision',
  },
  {
    id: 'soldDate',
    numeric: true,
    disablePadding: false,
    label: 'Fecha venta',
  },
  {
    id: 'os',
    numeric: true,
    disablePadding: false,
    label: 'Obra social',
  },
  {
    id: 'ttl',
    numeric: true,
    disablePadding: false,
    label: 'Fecha vencimiento',
  },
  {
    id: 'institution',
    numeric: true,
    disablePadding: false,
    label: 'Institucion',
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Estados',
  },
  {
    id: 'items',
    numeric: true,
    disablePadding: false,
    label: 'Items',
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = property => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {headRows.map(row => (
          <TableCell key={row.id} sortDirection={orderBy === row.id ? order : false}>
            <TableSortLabel active={orderBy === row.id} direction={order} onClick={createSortHandler(row.id)}>
              {row.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
}));

function EnhancedTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('id');

  /* const [selected, setSelected] = React.useState([]);
   const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
   */
  const { prescriptions } = props;
  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  }

  /* function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
  }
*/

  const emptyValueHandler = value => value || '-';
  if (prescriptions.length > 0) {
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <EnhancedTableToolbar />

          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle" size="medium">
              <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
              <TableBody>
                {props.prescriptions.map(prescription => (
                  <TableRow
                    hover
                    onClick={() => props.goToPrescriptionDetail(prescription.id)}
                    tabIndex={-1}
                    key={prescription.name}
                  >
                    <TableCell component="th" scope="row">
                      {prescription.id}
                    </TableCell>
                    <TableCell>{emptyValueHandler(prescription.issuedDate)}</TableCell>
                    <TableCell>{emptyValueHandler(prescription.soldDate)}</TableCell>
                    <TableCell>{emptyValueHandler(prescription.medicalInsurance.description)}</TableCell>
                    <TableCell>{emptyValueHandler(prescription.ttl)}</TableCell>
                    <TableCell>{emptyValueHandler(prescription.institution.description)}</TableCell>
                    <TableCell>{emptyValueHandler(prescription.status.status)}</TableCell>
                    <TableCell>{emptyValueHandler(prescription.items.length)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {/* <TablePagination
             rowsPerPageOptions={[5, 10, 25]}
             component="div"
             count={rows.length}
             rowsPerPage={rowsPerPage}
             page={page}
             backIconButtonProps={{
               'aria-label': 'Previous Page',
             }}
             nextIconButtonProps={{
               'aria-label': 'Next Page',
             }}
             onChangePage={handleChangePage}
             onChangeRowsPerPage={handleChangeRowsPerPage}
           /> */}
        </Paper>
      </div>
    );
  }
  return <div> No hay resultados para su busqueda</div>;
}
const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  spacer: {
    flex: '1 1 100%',
  },
  title: {
    flex: '0 0 auto',
  },
}));
const EnhancedTableToolbar = () => {
  const classes = useToolbarStyles();
  return (
    <Toolbar className={classes.root}>
      <div className={classes.title}>
        <Typography variant="h6" id="tableTitle">
          Recetas
        </Typography>
      </div>
      <div className={classes.spacer} />
    </Toolbar>
  );
};

export default EnhancedTable;
