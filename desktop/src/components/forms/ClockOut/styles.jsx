import { BorderBottom, BorderRight } from '@material-ui/icons'

const styles = (theme) => {
  return {
    hero: {
      //height: `100vh`,
      display: `flex`,
      flexDirection: `column`,
      justifyContent: `center`,
      alignItems: `center`,
      margin: '20px',
      paddingTop: '110px',
      paddingBottom: '140px',
    },
    textField: { width: `100%` },
    heroContent: {
      width: `100%`,
      maxWidth: `1000px`,
    },
    error: {
      color: theme.palette.error.main,
    },
    deleteButton: {
      width: '50px',
      height: '50px',
    },
    spaceBetween: {
      justifyContent: `space-between`,
    },
    flexEnd: {
      alignItems: `flex-end`,
      justifyContent: `flex-end`,
    },
    verticalCenter: {
      display: `flex`,
      alignItems: `center`,
    },
    formHeaderBar: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: '#fff',
      zIndex: 1001,
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      padding: '10px 16px',
    },
    formHeaderContent: {
      width: '100%',
      maxWidth: '1000px',
      position: 'relative',
      display: `flex`,
      alignItems: `center`,
      justifyContent: `space-between`,
    },
    formHeaderSection: {
      display: `flex`,
      alignItems: `center`,
    },
    formHeaderMiddle: {
      display: `flex`,
      flexDirection: 'row',
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
    },
    formHeaderIcon: {
      fontSize: `32px`,
      margin: `0 5px`,
    },
    addJob: { display: 'flex', justifyContent: 'center' },
    projectLine: {
      display: `flex`,
      alignItems: 'center',
    },
    projectField: {
      '& .MuiInputBase-input': {
        fontSize: '30px',
        margin: '10px',
      },
      '& .MuiInputLabel-root': {
        fontSize: '30px',
      },
      '& .MuiSelect-select': {
        fontSize: '30px',
        lineHeight: '1.5',
      },
    },
    projectDropdown: {
      fontSize: '30px',
    },
    errorText: {
      fontSize: '20px',
    },
    taskLine: {
      display: 'flex',
      marginLeft: '100px',
    },
    taskField: {
      '& .MuiInputBase-input': {
        fontSize: '20px',
        margin: '10px',
      },
      '& .MuiInputLabel-root': {
        fontSize: '25px',
      },
      '& .MuiSelect-select': {
        fontSize: '30px',
        lineHeight: '1.5',
      },
    },
    lunchTimeField: {
      '& .MuiInputLabel-root': {
        width: '100%',
        textAlign: 'center',
        left: 0,
      },
      '& .MuiInputLabel-shrink': {
        transformOrigin: 'center top',
      },
    },
    taskDropdown: {
      fontSize: '20px',
    },
    formBody: {
      display: `flex`,
      flexDirection: `column`,
    },
    formElement: {
      marginRight: theme.spacing.unit,
    },
    lunch: {
      display: 'flex',
      justifyContent: 'center',
    },
    lunchBox: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
    lunchLabel: {
      textAlign: 'left',
      fontSize: '30px',
      marginBottom: theme.spacing.unit,
    },
    statsBox: {
      display: 'flex',
      flexDirection: 'column',
    },
    formFooter: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      display: `flex`,
      flexDirection: `column`,
      alignItems: `center`,
      backgroundColor: '#fff',
      zIndex: 1000,
      boxShadow: '0 -2px 8px rgba(0,0,0,0.2)',
      padding: '10px 16px',
    },
    formFooterRow: {
      display: 'flex',
      alignItems: 'stretch',
      justifyContent: 'center',
      flexWrap: 'nowrap',
      width: '100%',
      overflowX: 'auto',
      padding: '8px 0',
      '& > div': {
        display: 'flex',
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'center',
        padding: '0 10px',
        flex: '1 1 0',
        minWidth: 0,
      },
      '& > div + div': {
        borderLeft: `1px solid ${theme.palette.divider}`,
      },
    },
    keyboardGrid: {
      position: `relative`,
    },
    keyboard: {
      width: `100%`,
      position: `absolute`,
    },
    clockOutSmallButtons: {
      padding: '5px',
      fontSize: '12px',
      whiteSpace: 'nowrap',
      flexShrink: 0,
    },
    clockOutRegularButtons: {
      padding: '20px',
      fontSize: '18px',
      whiteSpace: 'nowrap',
      flexShrink: 0,
    },
    clockOutLargeButtons: {
      padding: '40px',
      fontSize: '26px',
      whiteSpace: 'nowrap',
      flexShrink: 0,
    },
  }
}

export default styles
