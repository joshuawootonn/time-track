import ReactDOM from 'react-dom'
import App from './app'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { Provider } from 'react-redux'

import store from './store'
import './index.css'

export const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: { main: `#344955` },
    secondary: { main: `#faab1a` },
    action: { main: `#17262a` },
  },
})

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById(`root`),
)
