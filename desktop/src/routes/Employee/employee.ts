import accountActionScene from '~/scenes/Account/accountAction'
import clockOutScene from '~/scenes/Clock/clockOut'
import clockIn from '~/scenes/Clock/clockIn'
import { EMPLOYEE, CLOCKOUT, CLOCKIN } from '~/constants/routes'
import { RouteDetails } from '~/routes/route.types'

const employeeRoutes: RouteDetails[] = [
  {
    path: `/${EMPLOYEE}`,
    component: accountActionScene,
    exact: true,
    name: `Employee Actions`,
    type: EMPLOYEE,
  },
  {
    path: `/${EMPLOYEE}/${CLOCKOUT}`,
    component: clockOutScene,
    exact: true,
    name: `Employee Clockout`,
    type: EMPLOYEE,
  },
  {
    path: `/${EMPLOYEE}/${CLOCKIN}`,
    component: clockIn,
    exact: true,
    name: `Employee Clockin`,
    type: EMPLOYEE,
  },
]

export default employeeRoutes
