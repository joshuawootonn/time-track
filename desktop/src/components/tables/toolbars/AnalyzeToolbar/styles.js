import { lighten } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({ 
  toolbarRoot: {
    paddingRight: theme.spacing.unit,
    flexShrink: `0`
  },
  highlight:
    theme.palette.type === `light`
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85)
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark
      },
  spacer: {
    flex: `1 1 100%`
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: `0 0 auto`,
    textOverflow: `ellipsis`
  }
});

export default styles;
