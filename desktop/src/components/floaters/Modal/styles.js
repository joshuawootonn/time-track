const style = theme => ({
  paper: {
    position: 'absolute',
    minWidth: theme.spacing.unit * 20,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    left: '50%',
    top: '50%',
    transform: 'translate3d(-50%,-50%,0)'
  }
});

export default style;