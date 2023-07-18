import accountActionScene from '~/scenes/Account/accountAction';
import clockOutScene from '~/scenes/Clock/clockOut';
import { EMPLOYEE, CLOCKOUT } from '~/constants/routes';
import { RouteDetails } from '~/routes/route.types';

const employeeRoutes: RouteDetails[] = [
  {
    path: `/${EMPLOYEE}`,
    component: accountActionScene,
    exact: true,
    name: `Employee Actions`,
    type: EMPLOYEE
  },
  {
    path: `/${EMPLOYEE}/${CLOCKOUT}`,
    component: clockOutScene,
    exact: true,
    name: `Employee Clockout`,
    type: EMPLOYEE
  }
];

export default employeeRoutes;
