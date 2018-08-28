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
    maxWidth: '1000px'
  },
  error: { marginTop: '16px' },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  flexEnd: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  button: { marginLeft: '10px' },
  
  verticalCenter: {
    display: 'flex',
    alignItems: 'center'
  },
 

  formHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }, 
  formHeaderIcon: {
    fontSize: '32px',
    margin: '0 10px'
  },

  formBody: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',   
  },
  formElement: {
    marginLeft: '10px'
  },

  formFooter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
  
});

export default styles;
