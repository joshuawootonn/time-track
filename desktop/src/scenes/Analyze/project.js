import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { AppBar, IconButton, Toolbar, Tooltip, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ArrowBack } from '@material-ui/icons';

import Typeahead from 'components/inputs/TypeableSelect/autoComplete';
import PropTypes from 'prop-types';

import { Field, Form, Formik } from 'formik';

import { foremanActions, projectActions } from 'store/actions';
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
  constructor(props) {
    super(props);

    this.state = {
      selectedProject: undefined
    };
  }

  back = () => {
    this.props.history.push(`/`);
  };

  render() {
    const { classes, projects, updateFilter, selectedProjectId } = this.props;

    console.log({ updateFilter, selectedProjectId });
    return (
      <div className={classes.root}>
        <AppBar position="static" elevation={0}>
          <Toolbar className={classes.tool}>
            <Grid container direction="row" alignItems="center" spacing={1}>
              <Grid item xs={10}>
                {/* <Formik
                  initialValues={{ selectedProject: -1 }}
                  render={formikProps => {
                    console.log({ formikProps });
                    return (
                      <Form>
                        <Field
                          component={TypeableSelect}
                          type="name"
                          items={projects}
                          fullWidth
                          label="Project"
                          className={classes.field}
                          name={'selectedProject'}
                        />
                      </Form>
                    );
                  }}
                ></Formik> */}
                <Typeahead
                  value={this.state.selectedProject}
                  onChange={selectedProject => {
                    updateFilter(selectedProject.id);

                    console.log({ selectedProject });
                    return this.setState({ selectedProject });
                  }}
                  options={projects.map(item => {
                    return {
                      label: item.name,
                      value: item.name,
                      id: item.id,
                      data: { ...item }
                    };
                  })}
                />
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

        <div>{JSON.stringify(this.state.selectedProject)}</div>
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
  getAllProjects: PropTypes.func.isRequired
};

/* istanbul ignore next */
const mapStateToProps = state => {
  return {
    // selectedProject: projectSelectors.(state)
    projects: projectSelectors.getActiveProjects(state),
    selectedProjectId: state.foreman.projectId,
    selectedProject: projectSelectors.getProjectForemanView(state)
  };
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => {
  return {
    getAllProjects: () => {
      return dispatch(projectActions.getAllProjects());
    },
    updateFilter: projectId => {
      return dispatch(foremanActions.updateFilter(projectId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(Project)));
