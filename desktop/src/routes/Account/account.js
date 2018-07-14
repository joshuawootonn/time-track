import AccountActionScene from 'scenes/Account/accountAction';
import AccountSigninScene from 'scenes/Account/accountSignin';

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

