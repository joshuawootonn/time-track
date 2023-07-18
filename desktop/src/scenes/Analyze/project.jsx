import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { AppBar, IconButton, Toolbar, Tooltip, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ArrowBack } from '@material-ui/icons';

import TypeableSelect from '~/components/inputs/TypeableSelect';

import { Field, Form, Formik } from 'formik';

const styles = {
  root: {
    height: `100vh`,
    width: `100vw`
  },
  tab: {
    height: `calc(100% - 48px)`,
    display: `flex`
  },
  grow: {
    flexGrow: 1
  },
  tool: {
    minHeight: 0
  },
  gridHeight: {
    height: `auto`,
    position: `relative`,
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid rgba(224, 224, 224, 1)'
  }
};

export class Project extends Component {
  back = () => {
    this.props.history.push(`/`);
  };

  render() {
    const { classes, projects } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" elevation={0}>
          <Toolbar className={classes.tool}>
            <Grid container direction="row" alignItems="center" spacing={1}>
              <Grid item xs={10}>
                <Formik>
                  <Form>
                    <Field
                      name="Project select"
                      component={TypeableSelect}
                      type="name"
                      items={projects}
                      fullWidth
                      label="Project"
                      className={classes.field}
                    />
                  </Form>
                </Formik>
              </Grid>
              <Grid item xs={1}>
                <Tooltip title="Go Back" placement="bottom">
                  <IconButton color="inherit" onClick={this.back}>
                    <ArrowBack />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <p>hello world</p>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(Project));
