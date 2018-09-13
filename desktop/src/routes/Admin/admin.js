import accountActionScene from 'scenes/Account/accountActionScene';
import clockOutScene from 'scenes/Clock/clockOutScene';
import exportScene from 'scenes/Export/exportScene';
import * as routes from 'constants/routes';

export default [
  {
    path: `/${routes.ADMIN}`,
    component: accountActionScene,
    exact: true,
    name: 'Admin Actions',
    type: routes.ADMIN
  }, {
    path: `/${routes.ADMIN}/${routes.CLOCKOUT}`,
    component: clockOutScene,
    exact: true,
    name: 'Admin Clockout',
    type: routes.ADMIN
  }, {
    path: `/${routes.ADMIN}/${routes.EXPORT}`,
    component: exportScene,
    exact: true,
    name: 'Admin Export',
    type: routes.ADMIN
  }
];
