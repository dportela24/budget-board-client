import React from 'react'
import classes from './LogoText.module.css'

const logoText = (props) => {

    let textJSX;

    if (!props.inline) {
        textJSX = (
            <React.Fragment>
                <p className={classes.Title}>Budget</p>
                <p className={classes.Title}>Board</p>
            </React.Fragment>
        )
    } else {
        textJSX = <p className={classes.InlineTitle}>BudgetBoard</p>
    }

    return (
        <div className={classes.LogoText} style={props.style}>
            {textJSX}
        </div>
    )
}

export default logoText;