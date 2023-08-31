import { Typography } from '@material-ui/core'
import axiosInstance from '~/helpers/axios'
import useSWR from 'swr'
import Progress from '~/components/helpers/Progress'

type ProjectSummary = {
  date: string
  minutesWorkedLastWeek: number
  minutesWorkedThisWeek: number
  minutesWorkedYesterday: number
  id: number
  isActive: number
  name: string
  totalActual: number
  totalEstimate: number
}

type Props = {
  selectedProject: number
}

interface APICall {
  projects: ProjectSummary[]
}

const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data)

export const ForemanProjectSummary = (props: Props) => {
  const { data, error, isLoading } = useSWR<APICall>(
    '/projects/foreman-summary?isActive=true',
    fetcher,
  )

  if (error) {
    return (
      <div className="flex flex-col h-full w-full justify-center items-center mb-10">
        <Typography className="text-center" variant="body1">
          An error occurred.
          <br /> Reach out to support for help.
        </Typography>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex flex-col h-full w-full justify-center items-center mb-10">
        <Progress variant="circular" fullWidth fullHeight />
      </div>
    )
  }

  if (data == null || props.selectedProject == -1) {
    return null
  }

  const projectSummary = data.projects.find(
    (summary: ProjectSummary) => summary.id == props.selectedProject,
  )

  if (projectSummary == null) {
    return null
  }

  return (
    <div className="flex flex-col px-4 gap-2 w-full sm:w-96 justify-items-center mb-10">
      {/* todo (width) */}
      <div className="flex flex-row flex-grow justify-between bg-slate-50 border border-slate-100 p-4 rounded-md">
        <Typography>Total Estimate:</Typography>
        <Typography>
          {Math.floor(projectSummary.totalEstimate / 60).toLocaleString()}
        </Typography>
      </div>
      <div className="flex flex-row flex-grow justify-between bg-slate-50 border border-slate-100 p-4 rounded-md">
        <Typography>Total Actual:</Typography>
        <Typography>
          {Math.floor(projectSummary.totalActual / 60).toLocaleString()} /{' '}
          {(
            projectSummary.totalActual / projectSummary.totalEstimate
          ).toLocaleString(undefined, {
            style: 'percent',
            maximumFractionDigits: 0,
          })}
        </Typography>
      </div>
      <div className="flex flex-row flex-grow justify-between bg-slate-50 border border-slate-100 p-4 rounded-md">
        <Typography>Hours Worked Last Week:</Typography>
        <Typography>
          {Math.floor(projectSummary.minutesWorkedLastWeek / 60)}:{String(projectSummary.minutesWorkedLastWeek%60).padStart(2,'0')}
        </Typography>
      </div>
      <div className="flex flex-row flex-grow justify-between bg-slate-50 border border-slate-100 p-4 rounded-md">
        <Typography>Hours Worked This Week:</Typography>
        <Typography>
          {Math.floor(projectSummary.minutesWorkedThisWeek / 60)}:{String(projectSummary.minutesWorkedThisWeek%60).padStart(2,'0')}
        </Typography>
      </div>
      <div className="flex flex-row flex-grow justify-between bg-slate-50 border border-slate-100 p-4 rounded-md">
        <Typography>Hours Worked Yesterday:</Typography>
        <Typography>
          {Math.floor(projectSummary.minutesWorkedYesterday / 60)}:{String(projectSummary.minutesWorkedYesterday%60).padStart(2,'0')}
        </Typography>
      </div>
    </div>
  )
}
