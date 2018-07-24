import accountActionScene from 'scenes/Account/accountActionScene';
import * as accountTypes from 'constants/accountType'

export default [
  {
    path: `/${accountTypes.EMPLOYEE}`,
    component: accountActionScene,
    name: 'Employee Actions',
    type: accountTypes.EMPLOYEE
  },
]