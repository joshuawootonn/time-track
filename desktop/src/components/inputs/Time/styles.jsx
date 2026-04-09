const styles = () => ({
  fieldWrapper: {
    display: `flex`,
    flexDirection: `column`,
    width: `100%`,
  },
  autoWidth: {
    width: 'auto',
  },
  vertical: {
    flexDirection: `column`,
  },
  horizontal: {
    flexDirection: `row`,
  },
  selectWithSuffix: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    '& + &': {
      marginLeft: '10px',
    },
  },
  suffix: {
    marginLeft: '8px',
    whiteSpace: 'nowrap',
  },
  helper: {
    margin: '0 8px',
  },
  '@media (max-width: 500px)': {
    hours: {
      marginRight: '8px !important',
    },
    helper: {
      margin: '0 0px',
    },
  },
})

export default styles
