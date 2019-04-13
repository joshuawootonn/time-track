import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Formik } from 'formik';

import { account as accountValidation } from 'constants/formValidation';
import { employeeActions, staticActions } from 'store/actions';
import AccountSigin from 'components/forms/AccountSigin';
import { authoritySelectors } from 'store/selectors';

export class AccountSignin extends Component {

  componentDidMount = () => {
  //REMOVE before deploy
    // const { login, history, getStaticData } = this.props;
    // getStaticData();
    // login(`565656`).then(asdf => {
    //   const { authorityId } = asdf.data;  
    //   console.log(this.props,authorityId);
    //   setTimeout(() => history.push(`/${this.props.authorities[authorityId].type}`),500);              
    // }, () => {
    // //rip
    // });    
  }
  render() {
    // console.log(HOST());
    const { login, history, getStaticData, authorities } = this.props;
    return (
      <Formik
        initialValues={{ pin: `` }}
        validationSchema={accountValidation}
        onSubmit={(values,formikFunctions) => {
          return login(values.pin).then(
            response => {
              formikFunctions.resetForm();
              formikFunctions.setStatus({ success: true });
              const { authorityId } = response.data;
              history.push(`/${authorities[authorityId].type}`);
              getStaticData();              
            },
            e => {
              formikFunctions.resetForm();
              formikFunctions.setStatus({ success: false });
              formikFunctions.setSubmitting(false);              
              formikFunctions.setErrors({ submit: e.message || `Invalid pin!` });
            }
          );          
        }}
        render={formProps => <AccountSigin {...formProps} />}
      />
    );
  }
}

AccountSignin.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

/* istanbul ignore next */
const mapStateToProps = state => {
  return {
    authorities: authoritySelectors.getAuthoritiesFromEntities(state)
  };
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => {
  return {
    login: pin => {
      return dispatch(employeeActions.login(pin));
    },
    getStaticData: () => {
      return dispatch(staticActions.getStaticData());
    }
  };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AccountSignin));
