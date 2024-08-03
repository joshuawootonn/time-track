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
  bodyRow: {
    padding: `12px 0`,
  },
  headerRow: {
    padding: `0 0 12px 0`,
  },
  footerRow: {
    padding: `12px 0`,
    height: `64px`,
  },
  field: {
    margin: `0 8px`,
  },
  button: {
    marginLeft: `8px`,
  },
  verticalCenter: {
    display: `flex`,
    alignItems: `center`,
  },
  lunchBox: {
    width: `150px`,
  },
  '@media (max-width: 500px)': {
    row: {
      display: 'block'
    },
    field: {
      margin: '0 0px'
    },
    headerRow: {
      display: 'flex',
      alignItems: `center`,
      justifyContent: `space-between`,
    },
    lunchBox: {
      width: `50%`,
    },
    footerRow: {
      display: 'flex'
    }
  }
})

export default styles
