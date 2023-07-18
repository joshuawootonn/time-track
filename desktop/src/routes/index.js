import RouteMapper from './routeMapper';

import accountRoutes from '~/routes/Account';
import employeeRoutes from '~/routes/Employee';
import managerRoutes from '~/routes/Manager';
import adminRoutes from '~/routes/Admin';
import foremanRoutes from './Foreman/foreman';

const routes = [
  {
    component: RouteMapper,
    path: `/`,
    name: `Signin`,
    routes: accountRoutes
  },
  {
    component: RouteMapper,
    path: `/employee`,
    name: `Employee`,
    routes: employeeRoutes
  },
  {
    component: RouteMapper,
    path: `/manager`,
    name: `Manager`,
    routes: managerRoutes
  },
  {
    component: RouteMapper,
    path: `/admin`,
    name: `Admin`,
    routes: adminRoutes
  },
  {
    component: RouteMapper,
    path: `/foreman`,
    name: `Foreman`,
    routes: foremanRoutes
  }
];

export default routes;
