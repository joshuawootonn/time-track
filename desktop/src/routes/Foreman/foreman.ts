import accountActionScene from 'scenes/Account/accountAction';
import clockOutScene from 'scenes/Clock/clockOut';
import { FOREMAN, CLOCKOUT } from 'constants/routes';
import { RouteDetails } from 'routes/route.types';

const foremanRoutes: RouteDetails[] = [
  {
    path: `/${FOREMAN}`,
    component: accountActionScene,
    exact: true,
    name: 'Foreman Actions',
    type: FOREMAN
  },
  {
    path: `${FOREMAN}/${CLOCKOUT}`,
    component: clockOutScene,
    exact: true,
    name: 'Foreman Clockout',
    type: FOREMAN
  }
];

export default foremanRoutes;
