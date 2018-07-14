import RouteMapper from './routeMapper';

import userRoutes from 'routes/User';

const routes = [
  {
    component: RouteMapper,
    path: '/',
    name: 'Employee Signin',
    routes: userRoutes 
  }
]

export default routes;