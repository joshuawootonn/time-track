import accountActionScene from 'scenes/Account/accountActionScene';
import * as accountTypes from 'constants/accountType'

export default [
  {
    path: `/${accountTypes.ADMIN}`,
    component: accountActionScene,
    name: 'Admin Actions',
    type: accountTypes.ADMIN
  },
]