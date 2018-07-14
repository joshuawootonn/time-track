import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';

import styles from './styles';

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]

class AccountSigin extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.hero}>
        
        <Grid className={classes.heroContent}
         alignItems={"center"}
          justify={"center"}
          container
          spacing="12">
          {numbers.map((num, i) => {
            return <Grid container justify={"center"} xs={4}>
              <Button variant="outlined">1</Button>
            </Grid>
          })}

        </Grid>

      </div>

    )
  }
}
export default withStyles(styles)(AccountSigin)