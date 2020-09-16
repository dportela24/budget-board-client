import React from 'react'
import classes from './LogoText.module.css'

const logoText = (props) => {
    return (
        <div className={classes.LogoText} style={props.style}>
            <p className={classes.Title}>Budget</p>
            <p className={classes.Title}>Board</p>
        </div>
    )
}

export default logoText;