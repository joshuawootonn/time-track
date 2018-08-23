import accountActionScene from 'scenes/Account/accountActionScene';
import clockOutScene from 'scenes/Clock/clockOutScene';
import * as routes from 'constants/routes';

export default [
  {
    path: `/${routes.ADMIN}`,
    component: accountActionScene,
    exact: true,
    name: 'Admin Actions',
    type: routes.ADMIN,
  },
  {
    path: `/${routes.ADMIN}/${routes.CLOCKOUT}`,
    component: clockOutScene,
    exact: true,
    name: 'Admin Clockout',
    type: routes.ADMIN,
  },
];
