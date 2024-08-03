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
    height: `72px`,
  },
  label: {
    minWidth: '100px'
  },
  special: {
    marginRight: '10px'
  },
  '@media (max-width: 500px)': {
    buttons: {
      display: 'flex'
    },
    special: {
      width: '80px'
    }
  },
})

export default styles
