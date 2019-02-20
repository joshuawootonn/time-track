import { lighten } from '@material-ui/core/styles/colorManipulator';


export default theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    height: '100%'
  },  
  tableWrapper: {
    overflowX: 'auto'
  },
  toolbarRoot: {
    paddingRight: theme.spacing.unit,
    flexShrink: '0'
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85)
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark
      },
  spacer: {
    flex: '1 1 100%'
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: '0 0 auto',
    textOverflow: 'ellipsis'
  },
  headerCell: {
    background: 'white',
    position: 'sticky',
    top: 0
  },
  table: {
    fontFamily: theme.typography.fontFamily
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    flex: 1,
    
    marginRight: 0
  },
  tableRow: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.grey[200]
    },
  },
  tableRowHover: {
    
    marginRight: 0,
    flex: 1    
  },
  headerCell: {
    marginRight: 0,
    flex: 1
  },
  tableCell: {
    flex: 1,
    marginRight: 0
  },
  noClick: {
    cursor: 'initial'
  }
});