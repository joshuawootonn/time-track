import accountActionScene from '~/scenes/Account/accountAction';
import clockOutScene from '~/scenes/Clock/clockOut';
import exportScene from '~/scenes/Export/export';
import analyzeScene from '~/scenes/Analyze/analyze';
import { ADMIN, CLOCKOUT, EXPORT, ANALYZE } from '~/constants/routes';
import { RouteDetails } from '~/routes/route.types';

const adminRoutes: RouteDetails[] = [
  {
    path: `/${ADMIN}`,
    component: accountActionScene,
    exact: true,
    name: `Admin Actions`,
    type: ADMIN
  },
  {
    path: `/${ADMIN}/${CLOCKOUT}`,
    component: clockOutScene,
    exact: true,
    name: `Admin Clockout`,
    type: ADMIN
  },
  {
    path: `/${ADMIN}/${EXPORT}`,
    component: exportScene,
    exact: true,
    name: `Admin Export`,
    type: ADMIN
  },
  {
    path: `/${ADMIN}/${ANALYZE}`,
    component: analyzeScene,
    exact: true,
    name: `Admin Analyze`,
    type: ADMIN
  }
];

export default adminRoutes;
