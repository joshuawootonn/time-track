import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { analyzeActions } from 'store/actions';
import domain from 'constants/domains';
import { getAllProjectObjects } from 'store/Project/selectors';
import { getAllTaskObjects } from 'store/Task/selectors';
import { getAllCrewObjects } from 'store/Crew/selectors';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0
  },
  chip: {
    margin: theme.spacing(0.5)
  }
}));

const FilterChip = ({ label, onDelete }) => {
  const classes = useStyles();
  return (
    <li>
      <Chip label={label} onDelete={onDelete} className={classes.chip} />
    </li>
  );
};

const ShiftFilterChips = () => {
  const classes = useStyles();
  const filters = useSelector(state => state.analyze.shiftFilters);
  const projectObject = useSelector(state => getAllProjectObjects(state));
  const crewObject = useSelector(state => getAllCrewObjects(state));
  const taskObject = useSelector(state => getAllTaskObjects(state));
  const dispatch = useDispatch();

  const onDelete = keyToReset =>
    dispatch(
      analyzeActions.updateFilter(domain.SHIFT, {
        ...filters,
        [keyToReset]: -1
      })
    );

  return (
    <ul className={classes.root}>
      {filters.crewId !== -1 && (
        <FilterChip
          label={crewObject[filters.crewId].name}
          onDelete={() => onDelete('crewId')}
        />
      )}
      {filters.projectId !== -1 && (
        <FilterChip
          label={projectObject[filters.projectId].name}
          onDelete={() => onDelete('projectId')}
        />
      )}
      {filters.taskId !== -1 && (
        <FilterChip
          label={taskObject[filters.taskId].name}
          onDelete={() => onDelete('taskId')}
        />
      )}
    </ul>
  );
};

export default ShiftFilterChips;
