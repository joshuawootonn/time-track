import AccountActionScene from 'scenes/Account/accountActionScene';
import AccountSigninScene from 'scenes/Account/accountSigninScene';

export default [
  {
    path: '/actions',
    component: AccountActionScene,
    name: 'Actions',
  },
  {
    exact: true,
    path: '/',
    component: AccountSigninScene,
    name: 'Signin',
  },
];
