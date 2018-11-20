import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { analyzeActions } from 'store/actions';
import { getAllCrews } from 'store/Crew/actions';
import { crewSelectors } from 'store/selectors';
import SortSelectTable from 'components/tables/SortSelect';
import * as TableDataTypes from 'constants/tableDataTypes';
import domain from 'constants/domains';

class CrewIndexContainer extends Component {
  componentDidMount = () => {
    this.props.getAllCrews();
  }
  render () {
    const { crews,select,selected } = this.props; 
    return (
      <SortSelectTable
        selectLabel={selected => {return `${selected.name} selected`;}}
        label="Crews"
        tableData={crews}
        headerData={rows}
        selected={selected}
        select={object =>select(domain.CREW,object)}
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


CrewIndexContainer.propTypes = {
  getAllCrews: PropTypes.func.isRequired,
  crews: PropTypes.array.isRequired,
  select: PropTypes.func.isRequired,
  selected: PropTypes.object.isRequired
};

export default connect(mapStateToProps,
  { getAllCrews, ...analyzeActions })(CrewIndexContainer);


const rows = [
  {
    id: 'name',
    numeric: false,
    padding: 'dense',
    label: 'Name',
    type: TableDataTypes.STRING
  }
];