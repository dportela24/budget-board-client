import React from 'react'
import classes from './TextContainer.module.css'

const textContainer = (props) => {
    return (
        <div className={classes.TextContainer} style={props.style}>
            {props.children}
        </div>
    )
}

export default textContainer;