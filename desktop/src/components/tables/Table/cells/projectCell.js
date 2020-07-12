import React from 'react';
import { TableCell } from '@material-ui/core';
import classNames from 'classnames';
import uniqBy from 'lodash/uniqBy';
import Link from '@material-ui/core/Link';

import { css } from 'styled-components/macro';
import Tooltip from '@material-ui/core/Tooltip';
import { sortBy, sortedUniqBy } from 'lodash';

const styles = {
  root: css`
    button:not(:last-child) {
      margin-right: 8px;
    }
  `
};

const ProjectCell = ({ rowData, classes, rowHeight, updateFilter }) => {
  const projects = rowData.activities.map(
    activity => activity.projectTask.project
  );
  return (
    <TableCell
      component="div"
      className={classNames(classes.tableCell, classes.flexContainer)}
      css={styles.root}
      style={{ height: rowHeight }}
      padding="default"
    >
      {sortedUniqBy(sortBy(projects, [project => project.name]), 'id').map(
        (project, i) => {
          const numberOption = project.name.match(/\d+/);
          return (
            numberOption && (
              <Tooltip interactive key={i} title={project.name}>
                <Link
                  component="button"
                  size="small"
                  onClick={e => {
                    e.stopPropagation();
                    updateFilter({
                      projectId: project.id
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
