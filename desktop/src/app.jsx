import { Component } from 'react'
import { Route, Switch, HashRouter } from 'react-router-dom'

import PrivateRoute from '~/routes/privateRoute'
import AuthSigninScene from '~/scenes/Auth/authSignin'
import RouteWithSubRoutes from '~/routes/routeWithSubRoutes'

import SnackRootContainer from '~/containers/Floaters/snackRootContainer'
import ModalRootContainer from '~/containers/Floaters/modalRootContainer'

import routes from './routes'

export const AuthedRoutes = () => (
  <div>
    <SnackRootContainer />
    <ModalRootContainer />
    {routes.map((route, i) => {
      return <RouteWithSubRoutes key={i} {...route} />
    })}
  </div>
)

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/auth" component={AuthSigninScene} />
          <PrivateRoute path="/" component={AuthedRoutes} />
        </Switch>
      </HashRouter>
    )
  }
}

export default App
