import accountActionScene from 'scenes/Account/accountAction';
import clockOutScene from 'scenes/Clock/clockOut';
import exportScene from 'scenes/Export/export';
import analyzeScene from 'scenes/Analyze/analyze';
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
  }, {
    path: `/${routes.ADMIN}/${routes.ANALYZE}`,
    component: analyzeScene,
    exact: true,
    name: 'Admin Analyze',
    type: routes.ADMIN
  } 

];
