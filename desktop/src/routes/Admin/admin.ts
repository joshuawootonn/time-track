import accountActionScene from '~/scenes/Account/accountAction'
import clockOutScene from '~/scenes/Clock/clockOut'
import exportScene from '~/scenes/Export/export'
import analyzeScene from '~/scenes/Analyze/analyze'
import projectScene from '~/scenes/Analyze/projectScene'
import crewScene from '~/scenes/Analyze/crewScene'
import {
  ADMIN,
  CLOCKOUT,
  EXPORT,
  ANALYZE,
  PROJECTSUMMARY,
  CREW,
} from '~/constants/routes'
import { RouteDetails } from '~/routes/route.types'

const adminRoutes: RouteDetails[] = [
  {
    path: `/${ADMIN}`,
    component: accountActionScene,
    exact: true,
    name: `Admin Actions`,
    type: ADMIN,
  },
  {
    path: `/${ADMIN}/${CLOCKOUT}`,
    component: clockOutScene,
    exact: true,
    name: `Admin Clockout`,
    type: ADMIN,
  },
  {
    path: `/${ADMIN}/${EXPORT}`,
    component: exportScene,
    exact: true,
    name: `Admin Export`,
    type: ADMIN,
  },
  {
    path: `/${ADMIN}/${ANALYZE}`,
    component: analyzeScene,
    exact: true,
    name: `Admin Analyze`,
    type: ADMIN,
  },
  {
    path: `/${ADMIN}/${PROJECTSUMMARY}`,
    component: projectScene,
    exact: true,
    name: `Admin Project Summary`,
    type: ADMIN,
  },
  {
    path: `/${ADMIN}/${CREW}`,
    component: crewScene,
    exact: true,
    name: `Admin Crew`,
    type: ADMIN,
  },
]

export default adminRoutes
