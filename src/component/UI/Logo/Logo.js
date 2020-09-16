import React from 'react'
import LogoText from './LogoText/LogoText'
import logoSrc from '../../../assets/logo.png'
import classes from './Logo.module.css'

const logo = (props) => {
    return (
        <div className={classes.Logo} style={props.style}>
            <div className={classes.LogoImg}>
                <img src={logoSrc} alt="Logo.png"/>
            </div>

            <div className={classes.LogoText}>
                <LogoText inline={props.inline}/>
            </div>
        </div>
    )
}

export default logo;