import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
    const inputClasses = [classes.InputElement];

    if (!props.valid) {
        inputClasses.push(classes.Invalid);
    }
    
    let inputElement = (
        <input 
            className={inputClasses.join(' ')} 
            {...props.elementConfig}
            value={props.value}
            onChange={props.onChange}/>
    );

    return (
        <div className={classes.Input}>
            {inputElement}
            <span className={classes.ErrorMessage}>{props.errorMessage}</span>
        </div>
    )
}

export default input;