import AccountActionScene from 'scenes/Account/accountActionScene';
import AccountSigninScene from 'scenes/Account/accountSigninScene';

export default [
  {
    exact: true,
    path: '/',
    component: AccountSigninScene,
    name: 'Signin',
  },
  {
    path: '/actions',
    component: AccountActionScene,
    name: "Actions",    
  }
];

