const styles = (theme) => {
  return {
    hero: {
      height: `100vh`,
      display: `flex`,
      flexDirection: `column`,
      justifyContent: `center`,
      alignItems: `center`,
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
    formHeader: {
      position: 'relatve',
      display: `flex`,
      alignItems: `center`,
      justifyContent: `space-between`,
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
    },
    lunchBox: {
      width: `150px`,
    },
    bottomText: {
      margin: '20px',
    },
    formFooter: {
      display: `flex`,
      flexDirection: `column`,
      alignItems: `center`,
    },
    formFooterTop: {
      display: 'flex',
      margin: '20px',
    },
    formFooterBottom: {
      display: 'flex',
      flexDirection: ' column',
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
    },
    clockOutRegularButtons: {
      padding: '20px',
      fontSize: '18px',
    },
    clockOutLargeButtons: {
      padding: '40px',
      fontSize: '26px',
    },
  }
}

export default styles
