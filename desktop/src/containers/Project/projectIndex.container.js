import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VirtualizedSortSelect from 'components/tables/Table';
import Progress from 'components/helpers/Progress';
import { analyzeActions } from 'store/actions';
import * as TableDataTypes from 'constants/tableDataTypes';
import domain from 'constants/domains';
import { getAllProjectsNew, getProjectFilters } from 'store/Project/selectors';
import axios from 'helpers/axios';

const ProjectIndex = () => {
  const dispatch = useDispatch();
  const projects = useSelector(state => getAllProjectsNew(state));
  const { startTime, endTime, isActive } = useSelector(state =>
    getProjectFilters(state)
  );
  const [isLoading, setIsLoading] = useState(true);
  const [projectSummaries, setProjectSummaries] = useState([]);

  const select = object =>
    dispatch(analyzeActions.select(domain.PROJECT, object));

  useEffect(() => {
    axios
      .get(
        `/projects/summary?startTime=${startTime}&endTime=${endTime}&isActive=${isActive}`
      )
      .then(({ data: { projects } }) => {
        setProjectSummaries(projects);
        setIsLoading(false);
      });
  }, [startTime, endTime, projects]);

  if (!projectSummaries || projectSummaries.length === 0 || isLoading)
    return <Progress variant="circular" fullWidth fullHeight />;

  return (
    <VirtualizedSortSelect
      data={projectSummaries || []}
      columns={rows}
      select={select}
      initialSortBy="date"
    />
  );
};

export default ProjectIndex;

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
    width: 30,
    height: 56,
    align: `left`,
    padding: `dense`,
    label: `Active`,
    type: TableDataTypes.BOOLEAN
  },
  {
    id: `totalEstimate`,
    dataKey: `totalEstimate`,
    width: 60,
    height: 56,
    padding: `dense`,
    label: `Estimated Time`,
    type: TableDataTypes.LENGTH
  },
  {
    id: `totalActual`,
    dataKey: `totalActual`,
    width: 60,
    height: 56,
    padding: `dense`,
    label: `Actual Time`,
    type: TableDataTypes.LENGTH
  },
  {
    id: `projectCompletion`,
    dataKey: `projectCompletion`,
    width: 60,
    height: 56,
    padding: `dense`,
    label: `Percent Complete`,
    type: TableDataTypes.PROJECT_COMPLETION
  }
];
