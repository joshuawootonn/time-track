import React from 'react';
import { TableCell } from '@material-ui/core';
import classNames from 'classnames';
import uniqBy from 'lodash/uniqBy';
import Link from '@material-ui/core/Link';

import { css } from 'styled-components/macro';
import Tooltip from '@material-ui/core/Tooltip';

const styles = {
  root: css`
    button:not(:last-child) {
      margin-right: 8px;
    }
  `
};

const ProjectCell = ({ rowData, classes, rowHeight, updateFilter }) => {
  return (
    <TableCell
      component="div"
      className={classNames(classes.tableCell, classes.flexContainer)}
      css={styles.root}
      style={{ height: rowHeight }}
      padding="default"
    >
      {uniqBy(rowData.activities, 'projectTask.project.id').map(
        (activity, i) => {
          const numberOption = activity.projectTask.project.name.match(/\d+/);
          return (
            numberOption && (
              <Tooltip
                interactive
                key={i}
                title={activity.projectTask.project.name}
              >
                <Link
                  component="button"
                  size="small"
                  onClick={e => {
                    e.stopPropagation();
                    updateFilter({
                      projectId: activity.projectTask.project.id
                    });
                  }}
                >
                  {numberOption[0]}
                </Link>
              </Tooltip>
            )
          );
        }
      )}
    </TableCell>
  );
};

export default ProjectCell;
