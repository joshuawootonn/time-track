import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { crewActions,analyzeActions } from 'store/actions';
import { crewSelectors } from 'store/selectors';
import SortSelectTable from 'components/tables/SortSelect';
import * as TableDataTypes from 'constants/tableDataTypes';

class CrewIndexContainer extends Component {
  componentDidMount = () => {
    this.props.getCrews();
  }
  render () {
    const { crews,selectCrew,selected } = this.props; 
    return (
      <SortSelectTable
        selectLabel={selected => {return `${selected.name} selected`;}}
        label="Crews"
        tableData={crews}
        headerData={rows}
        selected={selected}
        select={selectCrew}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    crews: crewSelectors.getAllCrews(state),
    selected: crewSelectors.getSelectedCrew(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCrews: () => {
      return dispatch(crewActions.getCrews());
    },
    selectCrew: crew => {
      return dispatch(analyzeActions.selectCrew(crew));
    },
    setCrewStatus: status => {
      return dispatch(analyzeActions.setCrewStatus(status));
    }
  };
};

CrewIndexContainer.propTypes = {
  getCrews: PropTypes.func.isRequired,
  crews: PropTypes.array.isRequired,
  selectCrew: PropTypes.func.isRequired,
  selected: PropTypes.object.isRequired
};

export default connect(mapStateToProps,mapDispatchToProps)(CrewIndexContainer);


const rows = [
  {
    id: 'name',
    numeric: false,
    padding: 'dense',
    label: 'Name',
    type: TableDataTypes.STRING
  }
];