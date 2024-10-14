import { AUTH_LEVELS } from '~/constants/routes'

export interface RouteDetails {
  path: string
  component: unknown
  exact: boolean
  name: string
  type: AUTH_LEVELS
}
