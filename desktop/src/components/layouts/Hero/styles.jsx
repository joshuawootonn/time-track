const styles = () => ({
  fullWidth: {
    width: `100%`,
  },
  fullHeight: {
    height: `100%`,
  },
  fullPageWrapper: {
    height: `100vh`,
    width: `100vw`,
  },
  flex: {
    display: `flex`,
    justifyContent: `center`,
    alignItems: `center`,
  },
  '@media (max-width: 800px)': {
    flex: {
      alignItems: 'flex-start',
      marginTop: '20px'
    }
  }
})

export default styles
