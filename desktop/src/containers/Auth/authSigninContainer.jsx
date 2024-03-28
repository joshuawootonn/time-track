import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Formik } from 'formik'

import Progress from '~/components/helpers/Progress';
import { auth as authValidation } from '~/constants/formValidation'
import { userActions } from '~/store/actions'
import * as routes from '~/constants/routes'
import AuthSiginForm from '~/components/forms/AuthSignin'
import { userSelectors } from '~/store/selectors'
import { getCred } from '~/constants/storage'

function cleanIp(ip) {
  return ip.replace(/\/+$/, '')
}

export function AuthSignin({ login, history }) {
  const cred = getCred()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    login(cred.ip, cred.username, cred.password)
      .then(() => { history.push(routes.ROOT) })
      .finally(() => { setIsLoading(false) })
  }, [])

  return (isLoading ? (
    <div className="h-screen">
      <Progress variant="circular" fullWidth fullHeight />
    </div>
  ) : (
    <Formik
      initialValues={
        cred.ip && cred.username && cred.password
          ? { ip: cred.ip, username: cred.username, password: cred.password }
          : { ip: ``, username: ``, password: `` }
      }
      validationSchema={authValidation}
      onSubmit={(values, formikFunctions) => {
        const { ip, username, password } = values
        const cleanedIp = cleanIp(ip)
        return login(cleanedIp, username, password).then(
          () => {
            formikFunctions.resetForm()
            formikFunctions.setStatus({ success: true })
            history.push(routes.ROOT)
          },
          (error) => {
            formikFunctions.setErrors({ submit: error.message })
            formikFunctions.setStatus({ success: false })
            formikFunctions.setSubmitting(false)
          },
        )
      }}
      render={(formProps) => {
        return <AuthSiginForm {...formProps} />
      }}
    />)
  )
}

AuthSignin.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
}

/* istanbul ignore next */
const mapStateToProps = (state) => {
  return { user: userSelectors.getUser(state) }
}

/* istanbul ignore next */
const mapDispatchToProps = (dispatch) => {
  return {
    login: (ip, username, password) => {
      return dispatch(userActions.login(ip, username, password))
    },
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AuthSignin),
)
