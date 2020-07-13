import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import VirtualizedSortSelect from 'components/tables/Table';
import Progress from 'components/helpers/Progress';
import { analyzeActions } from 'store/actions';
import { projectSelectors, projectTaskSelectors } from 'store/selectors';
import * as TableDataTypes from 'constants/tableDataTypes';
import domain from 'constants/domains';

export class ProjectIndex extends Component {
  select = object => this.props.select(domain.PROJECT, object);

  render() {
    const { projects, selected } = this.props;

    if (!projects) return <Progress variant="circular" fullWidth fullHeight />;

    console.log('ping');

    return (
      <VirtualizedSortSelect
        data={projects || []}
        columns={rows}
        selected={selected}
        select={this.select}
        initialSortBy="date"
      />
    );
  }
}

ProjectIndex.propTypes = {
  projects: PropTypes.array,
  select: PropTypes.func.isRequired
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  projects: projectSelectors.getAllProjectsNew(state)
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  select: (domain, payload) => dispatch(analyzeActions.select(domain, payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectIndex);

const rows = [
  {
    id: `name`,
    dataKey: `name`,
    width: 200,
    height: 56,
    padding: `dense`,
    label: `Name`,
    type: TableDataTypes.STRING
  },
  {
    id: `date`,
    dataKey: `date`,
    width: 80,
    height: 56,
    padding: `dense`,
    label: `Date`,
    type: TableDataTypes.DATE
  },
  {
    id: `isActive`,
    dataKey: `isActive`,
    width: 50,
    height: 56,
    align: `left`,
    padding: `dense`,
    label: `Active`,
    type: TableDataTypes.BOOLEAN
  }
];
