import RouteMapper from './routeMapper';

import accountRoutes from 'routes/Account';

const routes = [
  {
    component: RouteMapper,
    path: '/',
    name: 'Employee Signin',
    routes: accountRoutes 
  }
]

export default routes;