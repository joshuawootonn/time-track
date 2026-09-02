import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import VirtualizedSortSelect from '~/components/tables/Table'
import Progress from '~/components/helpers/Progress'
import { analyzeActions } from '~/store/actions'
import * as TableDataTypes from '~/constants/tableDataTypes'
import domain from '~/constants/domains'
import { getAllProjectsNew, getProjectFilters } from '~/store/Project/selectors'
import axios from '~/helpers/axios'

const CurrentProjectIndex = () => {
  const dispatch = useDispatch()
  const projects = useSelector((state) => getAllProjectsNew(state))
  const { startTime, endTime } = useSelector((state) =>
    getProjectFilters(state),
  )
  const [isLoading, setIsLoading] = useState(true)
  const [projectSummaries, setProjectSummaries] = useState([])

  const select = (object) =>
    dispatch(analyzeActions.select(domain.PROJECT, object))

  const toggleActive = (project, checked) => {
    setProjectSummaries((summaries) =>
      summaries.map((summary) =>
        summary.id === project.id ? { ...summary, isActive: checked } : summary,
      ),
    )

    axios
      .patch(`/projects/${project.id}`, { isActive: checked ? 1 : 0 })
      .catch(() => {
        setProjectSummaries((summaries) =>
          summaries.map((summary) =>
            summary.id === project.id
              ? { ...summary, isActive: project.isActive }
              : summary,
          ),
        )
      })
  }

  useEffect(() => {
    Promise.all([
      axios.get(
        `/projects/summary?startTime=${startTime}&endTime=${endTime}&isActive=true`,
      ),
      axios.get(
        `/projects/summary?startTime=${startTime}&endTime=${endTime}&isActive=false`,
      ),
    ]).then(
      ([
        {
          data: { projects: activeProjects },
        },
        {
          data: { projects: inactiveProjects },
        },
      ]) => {
        setProjectSummaries([...activeProjects, ...inactiveProjects])
        setIsLoading(false)
      },
    )
  }, [startTime, endTime, projects])

  if (!projectSummaries || projectSummaries.length === 0 || isLoading)
    return <Progress variant="circular" fullWidth fullHeight />

  return (
    <VirtualizedSortSelect
      data={projectSummaries || []}
      columns={rows}
      select={select}
      onToggle={toggleActive}
      initialSortBy="date"
    />
  )
}

export default CurrentProjectIndex

const rows = [
  {
    id: `name`,
    dataKey: `name`,
    label: `Name`,
    type: TableDataTypes.STRING,
  },
  {
    id: `isActive`,
    dataKey: `isActive`,
    label: `Active`,
    type: TableDataTypes.SWITCH,
  },
]
