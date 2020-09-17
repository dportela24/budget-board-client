import React from 'react';
import classes from './Input.module.css';
import formClasses from '../Form.module.css';

const input = (props) => {
    const inputClasses = [classes.Input];

    if (props.invalid) inputClasses.push(formClasses.Invalid);

    if (props.size === 'large') inputClasses.push(formClasses.Large);
    else if (props.size === 'small') inputClasses.push(formClasses.Small);

    if (props.entryType === 'expense') inputClasses.push(formClasses.Expense);
    else if (props.entryType === 'income') inputClasses.push(formClasses.Income);

    let errorText = null;
    if (props.withError || props.errorMessage) {
        errorText = <span className={classes.ErrorMessage}>{props.errorMessage ? props.errorMessage : ' '}</span>
    }

    return (
        <div>
            <input 
                className={inputClasses.join(' ')}
                type={props.type ? props.type : 'text'}
                value={props.value}
                placeholder={props.placeholder}
                onChange={props.onChange}/>

            {errorText}
        </div>
    )
}

export default input;