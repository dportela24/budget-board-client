import React from 'react';
import classes from './Toolbar.module.css'
import Logo from '../../UI/Logo/Logo'

const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <div className={classes.Logo}>
                <Logo style={{fontSize:"0.5em"}} inline/>
            </div>

            <div className={classes.LogOut}>
                <p>
                    Logged as Username. <span onClick={props.onLogOut}>Leave.</span>
                </p>
            </div>
        </header>
    )
}

export default toolbar;