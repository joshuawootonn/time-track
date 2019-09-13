import { ReactElement, ReactComponentElement, ReactNode } from 'react';

import {AUTH_LEVELS} from 'constants/routes';

export interface RouteDetails {
  path: string;
  component: ReactNode;
  exact: boolean;
  name: string;
  type: AUTH_LEVELS
}