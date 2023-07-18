import React, { FC } from 'react';

import AccountActionContainer from '~/containers/Account/accountActionContainer';
import { AUTH_LEVELS } from '~/constants/routes';

interface AccountActionProps {
  type: AUTH_LEVELS;
}

const AccountAction: FC<AccountActionProps> = props => {
  return <AccountActionContainer type={props.type} />;
};

export default AccountAction;
