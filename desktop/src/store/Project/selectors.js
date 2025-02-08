import { createSelector } from 'reselect'
import moment from 'moment'

export const getProjectsFromEntities = (state) => state.entities.projects
export const getProjectsFromResults = (state) => state.results.projects

export const getProjectFilters = createSelector(
  (state) => state.analyze.projectFilters,
  (filters) => filters,
)

// ICEBOX: Test and migrate ProjectEdit selectors
export const getAllProjectsNew = createSelector(
  getProjectsFromEntities,
  getProjectsFromResults,
  getProjectFilters,
  (projects, results, filters) => {
    if (!results || results.length === 0) return null
    let list = results.map((projectId) => {
      return projects[projectId]
    })

    if (filters) {
      list = list.filter((project) => {
        if (
          filters.name !== `` &&
          !new RegExp(`${filters.name}`, `i`).test(`${project.name}`)
        ) {
          return false
        }
        if (
          moment(project.date).isBefore(
            moment(filters.startTime, `MM-DD-YY HH:mm:ss`),
          )
        ) {
          return false
        }
        if (
          moment(project.date).isAfter(
            moment(filters.endTime, `MM-DD-YY HH:mm:ss`),
          )
        ) {
          return false
        }
        if (!!project.isActive !== !!filters.isActive) {
          return false
        }
        return true
      })
    }
    return list
  },
)

export const getAllProjects = createSelector(
  getProjectsFromEntities,
  getProjectsFromResults,
  (projects, results) => {
    if (!results || results.length === 0) return null
    return results
      .map((projectId) => {
        return projects[projectId]
      })
      .sort((a, b) => {
        if (a.name > b.name) return 1
        if (a.name < b.name) return -1
        return 0
      })
  },
)

export const getActiveProjects = createSelector(
  getProjectsFromEntities,
  getProjectsFromResults,
  (projects, results) => {
    if (!results || results.length === 0) return null
    return results
      .map((projectId) => {
        return projects[projectId]
      })
      .filter((project) => {
        return !!project.isActive
      })
      .sort((a, b) => {
        if (a.name > b.name) return 1
        if (a.name < b.name) return -1
        return 0
      })
  },
)

export const getAllProjectObjects = createSelector(
  getAllProjects,
  (projects) => {
    // if the task array is empty
    if (!projects) return null
    // reduce the task array to a object with id as they key
    return Object.assign(
      {},
      ...projects.map((object) => ({ [object.id]: object })),
    )
  },
)
