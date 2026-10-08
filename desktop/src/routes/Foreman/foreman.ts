import accountActionScene from '~/scenes/Account/accountAction'
import clockOutScene from '~/scenes/Clock/clockOut'
import projectScene from '~/scenes/Analyze/projectScene'
import crewScene from '~/scenes/Analyze/crewScene'
import analyzeForeman from '~/scenes/Analyze/analyzeForeman'
import {
  FOREMAN,
  CLOCKOUT,
  CREW,
  PROJECTSUMMARY,
  CLOCKIN,
  ANALYZE,
} from '~/constants/routes'
import { RouteDetails } from '~/routes/route.types'
import clockIn from '~/scenes/Clock/clockIn'

const foremanRoutes: RouteDetails[] = [
  {
    path: `/${FOREMAN}`,
    component: accountActionScene,
    exact: true,
    name: 'Foreman Actions',
    type: FOREMAN,
  },
  {
    path: `/${FOREMAN}/${CLOCKIN}`,
    component: clockIn,
    exact: true,
    name: `Foreman Clockin`,
    type: FOREMAN,
  },
  {
    path: `/${FOREMAN}/${CLOCKOUT}`,
    component: clockOutScene,
    exact: true,
    name: 'Foreman Clockout',
    type: FOREMAN,
  },
  {
    path: `/${FOREMAN}/${PROJECTSUMMARY}`,
    component: projectScene,
    exact: true,
    name: 'Foreman Projects',
    type: FOREMAN,
  },
  {
    path: `/${FOREMAN}/${CREW}`,
    component: crewScene,
    exact: true,
    name: 'Foreman Crew',
    type: FOREMAN,
  },
  {
    path: `/${FOREMAN}/${ANALYZE}`,
    component: analyzeForeman,
    exact: true,
    name: 'Foreman Analyze',
    type: FOREMAN,
  },
]

export default foremanRoutes
