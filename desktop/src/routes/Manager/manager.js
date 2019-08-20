import accountActionScene from 'scenes/Account/accountAction';
import clockOutScene from 'scenes/Clock/clockOut';
import exportScene from 'scenes/Export/export';
import * as routes from 'constants/routes';

export default [
  {
    path: `/${routes.MANAGER}`,
    component: accountActionScene,
    exact: true,
    name: `Manager Actions`,
    type: routes.MANAGER
  },
  {
    path: `/${routes.MANAGER}/${routes.CLOCKOUT}`,
    component: clockOutScene,
    exact: true,
    name: `Manager Clockout`,
    type: routes.MANAGER
  },
  {
    path: `/${routes.MANAGER}/${routes.EXPORT}`,
    component: exportScene,
    exact: true,
    name: `Manager Export`,
    type: routes.MANAGER
  }
];
