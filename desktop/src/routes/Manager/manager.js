import accountActionScene from 'scenes/Account/accountActionScene';
import * as accountTypes from 'constants/accountType'

export default [
  {
    path: `/${accountTypes.MANAGER}`,
    component: accountActionScene,
    name: 'Manager Actions',
    type: accountTypes.MANAGER
  },
]