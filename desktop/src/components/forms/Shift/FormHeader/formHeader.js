import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Typography, Button, Tooltip, IconButton, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Delete } from '@material-ui/icons';
import cx from 'classnames';

import styles from './styles';
import * as formConstants from '../constants'

import { analyzeStatus } from 'constants/analyze';

export const FormHeader = props => {
  const {classes,remove,label,type, extent, extentOptions,updateExtent} = props;
  console.log(extentOptions)
  return (
    <Grid container spacing={24} className={classes.gridContainer}> 
      <Grid item xs={12} className={cx(classes.headerRow, classes.row)}>
        <Typography variant="h6">{label}</Typography>
        <div>
          {extentOptions && extentOptions.length > 0 && 
            extentOptions.map(extentOption => {
              return (
                <Button
                  variant={extentOption.type == extent ? "contained" : "outlined"}
                  onClick={() => updateExtent(type,extentOption.type)}
                  style={{marginRight: '10px'}}
                >
                  {extentOption.label}
                </Button>

              )
            })
          }
        </div>
        {type === analyzeStatus.EDITING && (
          <Tooltip title="Delete Shift">
            <IconButton onClick={remove}>
              <Delete />
            </IconButton>
          </Tooltip>
        )}
      </Grid>
    </Grid>
  );
};

FormHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  remove: PropTypes.func,
  label: PropTypes.string,
  type: PropTypes.oneOf(['adding','editing']),
  extent: PropTypes.oneOf([formConstants.HALF_SHIFT,formConstants.FULL_SHIFT]),
  extentOptions: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.oneOf([formConstants.HALF_SHIFT,formConstants.FULL_SHIFT]),
    label: PropTypes.string
  })),
  updateExtent: PropTypes.func
}

export default withStyles(styles)(FormHeader);