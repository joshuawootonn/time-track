/* eslint-disable react/prop-types */
import React from 'react';
import { TableCell } from '@material-ui/core';
import classNames from 'classnames';
import Tooltip from '@material-ui/core/Tooltip';
import Link from '@material-ui/core/Link';
import { sortBy, sortedUniqBy } from 'lodash';
import { css } from 'styled-components/macro';

const styles = {
  root: css`
    button:not(:last-child) {
      margin-right: 8px;
    }
  `
};

const TaskCell = ({ rowData, classes, rowHeight, updateFilter }) => {
  const tasks = rowData.activities.map(activity => activity.projectTask.task);
  return (
    <TableCell
      component="div"
      className={classNames(classes.tableCell, classes.flexContainer)}
      css={styles.root}
      style={{ height: rowHeight }}
      padding="default"
    >
      {sortedUniqBy(sortBy(tasks, [task => task.name]), 'id').map((task, i) => {
        const shortName =
          task.name.length >= 8 ? task.name.substr(0, 8) : task.name;
        return (
          <Tooltip interactive key={i} title={task.name}>
            <Link
              component="button"
              size="small"
              onClick={e => {
                e.stopPropagation();
                updateFilter({
                  taskId: task.id
                });
              }}
            >
              {shortName}
            </Link>
          </Tooltip>
        );
      })}
    </TableCell>
  );
};

export default TaskCell;
