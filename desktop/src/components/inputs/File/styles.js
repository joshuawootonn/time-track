const styles = () => ({
  inputToHide: {
    width: '0px',
    height: '0px',
    opacity: '0',
    overflow: 'hidden',
    position: 'absolute',
    zIndex: '-1'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },
  buttonAlign: {
    display: 'flex',
    alignItems: 'flex-end'
  },
  button: {
    marginLeft: '10px',
    whiteSpace: 'nowrap'
  }
});

export default styles;
