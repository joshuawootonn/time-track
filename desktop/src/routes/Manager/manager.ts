import accountActionScene from '~/scenes/Account/accountAction'
import clockOutScene from '~/scenes/Clock/clockOut'
import exportScene from '~/scenes/Export/export'
import { MANAGER, CLOCKOUT, EXPORT, CLOCKIN } from '~/constants/routes'
import { RouteDetails } from '~/routes/route.types'
import clockIn from '~/scenes/Clock/clockIn'

const managerRoutes: RouteDetails[] = [
  {
    path: `/${MANAGER}`,
    component: accountActionScene,
    exact: true,
    name: `Manager Actions`,
    type: MANAGER,
  },
  {
    path: `/${MANAGER}/${CLOCKIN}`,
    component: clockIn,
    exact: true,
    name: `Manager Clockin`,
    type: MANAGER,
  },
  {
    path: `/${MANAGER}/${CLOCKOUT}`,
    component: clockOutScene,
    exact: true,
    name: `Manager Clockout`,
    type: MANAGER,
  },
  {
    path: `/${MANAGER}/${EXPORT}`,
    component: exportScene,
    exact: true,
    name: `Manager Export`,
    type: MANAGER,
  },
]

export default managerRoutes
