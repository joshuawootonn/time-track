const styles = (theme) => ({
  hero: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textField: { width: '100%' },
  heroContent: { 
    width: '100%',
    
    maxWidth: '1000px' },
  error: { marginTop: '16px' },
  lineBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  button: { marginLeft: '10px' },
  horizontalBox: {
    display: 'flex',
    flexDirection: 'row',
  },
  card: {
    width: '100%'
  },
  verticalCenterBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headlineIcon: {
    fontSize: '32px',
    margin: '0 10px'
  }
 
});

export default styles;
