import React from 'react';
import classes from './PlusButton.module.css';
import formClasses from '../Form.module.css'

const plusButton = (props) => {
    const buttonClasses = [classes.PlusButton];

    if (props.entryType === 'expense') buttonClasses.push(formClasses.Expense);
    else if (props.entryType === 'income') buttonClasses.push(formClasses.Income);

    return (
        <button className={buttonClasses.join(' ')}><i className="fas fa-plus"></i></button>
    )
}

export default plusButton;