const styles = () => ({
  gridContainer: {
    width: `100% !important`,
    margin: 0
  },
  row: {
    display: `flex`,
    flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `space-between`
  },
  scroll: {
    overflow: 'auto',
    maxHeight: 'calc(100vh - 428px)'
  },
  totalRow: {
    paddingRight: '48px'
  },
  headerRow: {
    minHeight: `72px`
  },
  field: {
    margin: `auto 8px`
  },
  spacer: {
    width: '100%',
    margin: `auto 8px`
  },
  taskField: {
    margin: `auto 8px`,
    width: '250%'
  },
  switchBox: {
    width: `100%`,
    display: `flex`,
    justifyContent: `space-around`
  },
  error: { marginTop: `16px` },
  button: {
    marginLeft: `8px`
  }
});

export default styles;
