import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getProjectForemanView } from 'store/Project/selectors';
import axios from 'helpers/axios';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    height: `calc(100vh - 48px)`,
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  insideContainer: {
    display: 'flex'
  },
  gridItem: {
    border: '1px solid #ccc',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    width: '500px',
  
    display: 'flex',
    padding: '8px',
    borderRadius: '4px',
    marginBottom: '8px',
    flexShrink: '1'
  }
});

const ProjectSummary = selectedProjectId => {
  // const dispatch = useDispatch();

  const projects = useSelector(state => getProjectForemanView(state));
  const [projectSummaries, setProjectSummaries] = useState([]);
  const classes = useStyles();

  // const select = object =>
  //   dispatch(foremanActions.select(domain.PROJECT, object));

  useEffect(() => {
    axios
      .get('/projects/foremansummary?isActive=true')
      .then(({ data: { projects } }) => {
        setProjectSummaries(projects);
      });
  }, [projects]);

  const projectSummary = projectSummaries.find(
    summary => summary.id == selectedProjectId.selectedProject
  );

  if (projectSummary) {
    return (
      <div className={classes.container}>
        <div className={classes.insideContainer}>
          <Grid container direction="column" alignItems="center">
            <div className={classes.gridItem} style={{ marginTop: '8px' }}>
              <Grid item md={6} xs={8} style={{ flex: '1 1 auto' }}>
                <Typography>Total Estimate:</Typography>
              </Grid>
              <Grid item style={{ flex: '1 1 auto' }}>
                <Typography>
                  {projectSummary.totalEstimate.toLocaleString()}
                </Typography>
              </Grid>
            </div>
            <div className={classes.gridItem}>
              <Grid item xs={6}>
                <Typography noWrap="true">Total Actual:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography noWrap="true">
                  {projectSummary.totalActual.toLocaleString()} /{' '}
                  {(
                    projectSummary.totalActual / projectSummary.totalEstimate
                  ).toLocaleString(undefined, {
                    style: 'percent',
                    maximumFractionDigits: 1
                  })}
                </Typography>
              </Grid>
            </div>
            <div className={classes.gridItem}>
              <Grid item xs={6}>
                <Typography>Hours Worked Last Week:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{projectSummary.hoursWorkedLastWeek}</Typography>
              </Grid>
            </div>
            <div className={classes.gridItem}>
              <Grid item xs={6}>
                <Typography>Hourse Worked This Week:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{projectSummary.hoursWorkedThisWeek}</Typography>
              </Grid>
            </div>
            <div className={classes.gridItem}>
              <Grid item xs={6}>
                <Typography>Hours Worked Yesterday:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{projectSummary.hoursWorkedYesterday}</Typography>
              </Grid>
            </div>
          </Grid>
        </div>
      </div>
    );
  } else {
    return <div>{JSON.stringify(projectSummary)} </div>;
  }
};

export default ProjectSummary;
