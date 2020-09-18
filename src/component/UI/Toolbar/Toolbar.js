import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Toolbar.module.css'
import Logo from '../../UI/Logo/Logo'

const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <div className={classes.Logo}>
                <Logo style={{fontSize:"0.5em"}} inline/>
            </div>

            <div>
                <p>
                    Logged as {props.username}. <Link to="/logout"><span className={classes.LogOut}>Leave.</span></Link>
                </p>
            </div>
        </header>
    )
}

export default toolbar;