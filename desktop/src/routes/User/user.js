import SigninScene from 'scenes/signinScene';
// import ProjectHistory from 'scenes/projects/projectHistory';
// import ProjectEvent from 'scenes/projects/projectEvent';
// import ProjectProperty from 'scenes/projects/projectProperty';

export default [
  {
    exact: true,
    path: '/',
    component: SigninScene,
    name: 'Signin',
  },
  // {
  //   path: '/projects/:id/history',
  //   name: 'History',
  //   component: ProjectHistory,
  // },
  // {
  //   path: '/projects/:id/properties',
  //   name: 'Properties',
  //   component: ProjectProperty,
  // },
  // {
  //   path: '/projects/:id/events',
  //   name: 'Events',
  //   component: ProjectEvent,
  // },
];

