const styles = () => ({
  fieldWrapper: {
    display: `flex`,
    flexDirection: `column`,
    width: `100%`,
  },
  vertical: {
    flexDirection: `column`,
  },
  horizontal: {
    flexDirection: `row`,
  },
  helper: {
    margin: '0 8px'
  },
  '@media (max-width: 500px)': {
    hours: {
      marginRight: '8px !important',
    },
    helper: {
      margin: '0 0px'
    }
  }
})

export default styles
