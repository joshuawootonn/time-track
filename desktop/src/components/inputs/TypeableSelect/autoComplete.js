import React from 'react';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import { components } from './components';

//todo remove styles that are not used
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  input: {
    display: 'flex',
    padding: 0,
    height: 'auto'
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center'
  },
  chip: {
    margin: `${theme.spacing(0.5)}px ${theme.spacing(0.25)}px`
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light'
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08
    )
  },
  noOptionsMessage: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`
  },
  singleValue: {
    fontSize: 16
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16
  },
  menu: {
    marginTop: theme.spacing(1),
    position: 'absolute',
    zIndex: 1,
    left: 0,
    right: 0
  },
  divider: {
    height: theme.spacing(2)
  }
});

function Typeahead(props) {
  const { required, classes } = props;
  return (
    <Select
      classes={classes}
      required={required}
      components={components}
      {...props}
    />
  );
}

export default withStyles(styles, { withTheme: true })(Typeahead);
