import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import { ShowChart, Check, Close, ArrowBack } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'
const AccountActionForm = (props) => {
  const {classes} = props;
  return (
    <div className={classes.hero}>
      <div className={classes.heroContent}>
        <IconButton className={classes.button}>
          <Check className={classes.buttonIcon} />
        </IconButton>    
        <IconButton className={classes.button}>
          <ShowChart className={classes.buttonIcon} />
        </IconButton>
        <IconButton onClick={props.back} className={classes.button}>
          <ArrowBack className={classes.buttonIcon} />
        </IconButton>
      </div>
    </div>
  )
}

export default withStyles(styles)(AccountActionForm)