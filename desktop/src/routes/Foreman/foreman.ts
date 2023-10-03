import accountActionScene from '~/scenes/Account/accountAction'
import clockOutScene from '~/scenes/Clock/clockOut'
import projectScene from '~/scenes/Analyze/project'
import { FOREMAN, CLOCKOUT, ANALYZE, CREW, PROJECTSUMMARY } from '~/constants/routes'
import { RouteDetails } from '~/routes/route.types'

const foremanRoutes: RouteDetails[] = [
  {
    path: `/${FOREMAN}`,
    component: accountActionScene,
    exact: true,
    name: 'Foreman Actions',
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
    component: projectScene,
    exact: true,
    name: 'Foreman Crew',
    type: FOREMAN,
  },
]

export default foremanRoutes
