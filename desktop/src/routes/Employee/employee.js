import accountActionScene from 'scenes/Account/accountAction';
import clockOutScene from 'scenes/Clock/clockOut';
import * as routes from 'constants/routes';

export default [
  {
    path: `/${routes.EMPLOYEE}`,
    component: accountActionScene,
    exact: true,
    name: `Employee Actions`,
    type: routes.EMPLOYEE
  },
  {
    path: `/${routes.EMPLOYEE}/${routes.CLOCKOUT}`,
    component: clockOutScene,
    exact: true,
    name: `Employee Clockout`,
    type: routes.EMPLOYEE
  }
];
