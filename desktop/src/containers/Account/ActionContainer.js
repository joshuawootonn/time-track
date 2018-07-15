import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import AccountActionForm from 'components/forms/AccountActionForm';

class AccountAction extends Component {
  back = () =>{
    console.log(this.props.history.location.pathname)
    this.props.history.push('/');
  }
  render () {

    console.log(this.props.history.location.pathname)
    return (
      <div>
      <AccountActionForm back={this.back}/>
      </div>
    )
  }
}

export default withRouter(AccountAction);