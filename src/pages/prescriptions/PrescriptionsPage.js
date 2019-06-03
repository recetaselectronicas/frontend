import React, { useEffect, useState } from 'react';

import Grid from '@material-ui/core/Grid';

const initialState = {};

const PrescriptionsPage = () => (
  <Grid container>
    <Grid item xs={4}>
      special filter
    </Grid>
    <Grid item xs={8}>
      <div>Filters</div>
      <div>lista de recetas</div>
    </Grid>
  </Grid>
);

export default PrescriptionsPage;
