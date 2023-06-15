import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { AppBar, IconButton, Toolbar, Tooltip, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ArrowBack } from '@material-ui/icons';

import TypeableSelect from 'components/inputs/TypeableSelect';
import PropTypes from 'prop-types';

import { Field, Form, Formik } from 'formik';

import { projectActions } from 'store/actions';
import { projectSelectors } from 'store/selectors';

const styles = {
  root: {
    height: `100vh`
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
            <Grid
              container
              direction="row"
              alignItems="center"
              spacing={1}
            >
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
                      id={`${ANALYZE_SHIFT_FULL_SHIFT_PROJECT_FIELD_ID}`}
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
        {/* <button onClick={console.log(this.props.getAllProjects())} /> */}
        {/* <Form name="hi">
          <Field
            name="hi"
            component={TypeableSelect}
            type="name"
            items={this.props.getAllProjects}
            fullWidth
            label="Project"
            className={classes.field}
          />
        </Form> */}
        {/* <div>
          <Formik
            render={formikProps => {
              return (
                <Field name="firstName" placeholder="Jane" {...formikProps} />
              );
            }}
          />
        </div> */}
      </div>
    );
  }
}

export const ANALYZE_SHIFT_FULL_SHIFT_PROJECT_FIELD_ID = `analyze_shift_full_shift_project_field`;

Project.prototypes = {
  getAllProjects: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => {
  return {
    projects: projectSelectors.getActiveProjects(state),
  };
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => {
  return {
    getAllProjects: () => {
      return dispatch(projectActions.getAllProjects());
    },
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(Project)));
