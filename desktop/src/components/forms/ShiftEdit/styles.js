const styles = theme => ({
  gridContainer: {
    width: '100% !important',
    margin: 0
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerRow: {
    minHeight: '72px'
  },
  field:{
    margin: 'auto 8px'
  },
  switchBox: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around'
  },
  error: { marginTop: '16px' },
  button: {
    marginLeft: '8px'
  },

  ///////////////////////
  textField: { width: '100%' },
  heroContent: {
    width: '100%',
    maxWidth: '1000px'
  },
  error: {
    color: theme.palette.error.main
  },
  spaceBetween: {
    justifyContent: 'space-between'
  },
  flexEnd: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  button: { marginLeft: '10px' },

  verticalCenter: {
    display: 'flex',
    alignItems: 'center'
  },

  formHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: theme.spacing.unit
  },
  formHeaderIcon: {
    fontSize: '32px',
    margin: '0 10px'
  },

  formBody: {
    display: 'flex',
    padding: '12px 0',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  formElement: {
    marginRight: theme.spacing.unit
  },

  formFooter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height:'68px'
  },
  lunchBox: {
    width: '150px'
  },
  fullWidth: {
    width: '100%'
  }
});

export default styles;
