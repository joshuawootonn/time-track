import React, { Component } from 'react'
import { connect } from 'react-redux';

import { employeeActions } from 'store/actions';
import {employeeSelectors } from 'store/selectors';

class EmployeeContainer extends Component {
  componentDidMount = () => {
    this.props.getEmployees();
  }
  render() {
    console.log(this.props.employees[0].firstName);
    return (
      <div>
        employee
        {this.props.employees.map((ele) => {
          return <div>{ele.firstName}</div>
        })}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    employees: employeeSelectors.getAllEmployees(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getEmployees: () => {
      return dispatch(employeeActions.getEmployees())
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(EmployeeContainer);