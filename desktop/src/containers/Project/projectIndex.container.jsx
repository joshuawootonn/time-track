import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import VirtualizedSortSelect from '~/components/tables/Table'
import Progress from '~/components/helpers/Progress'
import { analyzeActions } from '~/store/actions'
import domain from '~/constants/domains'
import { getAllProjectsNew, getProjectFilters } from '~/store/Project/selectors'
import axios from '~/helpers/axios'

const ProjectIndex = ({ columns, forceCurrent }) => {
  const dispatch = useDispatch()
  const projects = useSelector((state) => getAllProjectsNew(state))
  const { startTime, endTime, isCurrent } = useSelector((state) =>
    getProjectFilters(state),
  )
  const [isLoading, setIsLoading] = useState(true)
  const [projectSummaries, setProjectSummaries] = useState([])

  const select = (object) =>
    dispatch(analyzeActions.select(domain.PROJECT, object))

  const query = forceCurrent
    ? `/projects/summary?isArchived=false`
    : `/projects/summary?startTime=${startTime}&endTime=${endTime}&isArchived=${!isCurrent}`

  useEffect(() => {
    axios.get(query).then(({ data: { projects } }) => {
      setProjectSummaries(projects)
      setIsLoading(false)
    })
  }, [query, projects])

  if (!projectSummaries || projectSummaries.length === 0 || isLoading) {
    return <Progress variant="circular" fullWidth fullHeight />
  }

  return (
    <VirtualizedSortSelect
      data={projectSummaries || []}
      columns={columns}
      select={select}
      initialSortBy="date"
    />
  )
}

export default ProjectIndex
