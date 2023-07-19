import { makeStyles } from '@material-ui/core/styles'
import { useEffect, useState } from 'react'
import { Grid, Typography } from '@material-ui/core'
import axiosInstance from '~/helpers/axios'

const useStyles = makeStyles({
  container: {
    height: `calc(100vh - 48px)`,
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  insideContainer: {
    display: 'flex',
  },
  gridItem: {
    border: '1px solid #ccc',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    width: '500px',

    display: 'flex',
    padding: '8px',
    borderRadius: '4px',
    marginBottom: '8px',
    flexShrink: 1,
  },
})

type ProjectSummary = {
  date: string
  hoursWorkedLastWeek: number
  hoursWorkedThisWeek: number
  hoursWorkedYesterday: number
  id: number
  isActive: number
  name: string
  totalActual: number
  totalEstimate: number
}

type Props = {
  selectedProject: number
}

export const ForemanProjectSummary = (props: Props) => {
  // const dispatch = useDispatch();

  // const projects = useSelector((state) => (state))
  const [projectSummaries, setProjectSummaries] = useState<ProjectSummary[]>([])
  const classes = useStyles()

  // const select = object =>
  //   dispatch(foremanActions.select(domain.PROJECT, object));

  useEffect(() => {
    axiosInstance
      .get('/projects/foremansummary?isActive=true')
      .then(({ data: { projects } }) => {
        setProjectSummaries(projects)
      })
  }, [])

  const projectSummary = projectSummaries.find(
    (summary) => summary.id == props.selectedProject,
  )

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
                <Typography noWrap={true}>Total Actual:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography noWrap={true}>
                  {projectSummary.totalActual.toLocaleString()} /{' '}
                  {(
                    projectSummary.totalActual / projectSummary.totalEstimate
                  ).toLocaleString(undefined, {
                    style: 'percent',
                    maximumFractionDigits: 1,
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
        <div className="grid grid-cols-[minmax(0,2fr),minmax(0,1fr)] w-96 bg-slate-50 p-4 rounded-md">
          <Typography>Hours Worked Yesterday:</Typography>
          <Typography className="justify-self-end">
            {projectSummary.hoursWorkedYesterday}
          </Typography>
        </div>
      </div>
    )
  } else {
    return <div>{JSON.stringify(projectSummary)} </div>
  }
}
