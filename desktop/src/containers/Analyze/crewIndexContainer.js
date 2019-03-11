import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { analyzeActions,crewActions } from 'store/actions';
import { crewSelectors } from 'store/selectors';
import SortSelectTable from 'components/tables/SortSelect';
import * as TableDataTypes from 'constants/tableDataTypes';
import { analyzeStatus } from 'constants/analyze';
import domain from 'constants/domains';

export class CrewIndex extends Component {
  componentDidMount = () => {
    this.props.getAllCrews();
  }

  selectLabel = selected => `${selected.name} selected`

  select = object => this.props.select(domain.CREW,object)

  add = () => this.props.setStatus(domain.CREW,analyzeStatus.ADDING)

  render () {
    const { crews,selected } = this.props; 
    return (
      <SortSelectTable
        selectLabel={this.selectLabel}
        label="Crews"
        tableData={crews}
        headerData={rows}
        selected={selected}
        select={this.select}    
        add={this.add}
        initialOrderBy='name'
      />
    );
  }
}

CrewIndex.propTypes = {
  getAllCrews: PropTypes.func.isRequired,
  crews: PropTypes.array.isRequired,
  select: PropTypes.func.isRequired,
  selected: PropTypes.object.isRequired,
  setStatus:PropTypes.func.isRequired
};

/* istanbul ignore next */
const mapStateToProps = state => {
  return {
    crews: crewSelectors.getAllCrews(state),
    selected: crewSelectors.getSelectedCrew(state)
  };
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => {
  return {
    getAllCrews: () => {
      return dispatch(crewActions.getAllCrews());
    },
    ...bindActionCreators({ ...analyzeActions }, dispatch)   
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(CrewIndex);

const rows = [
  {
    id: 'name',
    padding: 'dense',
    label: 'Name',
    type: TableDataTypes.STRING
  }
];