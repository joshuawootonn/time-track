import React from 'react';


import { Grid, Typography, Button, Tooltip, IconButton, MenuItem } from '@material-ui/core';
import { Delete } from '@material-ui/icons';


export const FormHeader = props => {

  return (
    <Grid container spacing={24} className={classes.gridContainer}> 
      <Grid item xs={12} className={cx(classes.headerRow, classes.row)}>
        <Typography variant="h6">{label}</Typography>
        {type === 'edit' && (
          <Tooltip title="Delete">
            <IconButton onClick={removeShift} aria-label="Delete">
              <Delete />
            </IconButton>
          </Tooltip>
        )}
      </Grid>
    </Grid>
  );
};

export default FormHeader;