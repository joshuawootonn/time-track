const styles = () => ({
  gridContainer: {
    width: `100% !important`,
    margin: 0,
  },
  row: {
    display: `flex`,
    flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `space-between`,
  },
  headerRow: {
    minHeight: `72px`,
  },
  footerRow: {
    padding: `12px 0`,
    height: `68px`,
  },
  field: {
    margin: `0 8px`,
  },
  button: {
    marginLeft: `8px`,
  },
  '@media (max-width: 800px)': {
    main: {
      display: 'flex',
      flexDirection: 'column',
    },
    currentShiftLength: {
      marginBottom: '10px'
    }
  },
  '@media (max-width: 600px)': {
    row: {
      flexDirection: 'column'
    },
    field: {
      marginBottom: '10px'
    }
  }
})

export default styles
