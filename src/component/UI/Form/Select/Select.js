import React from 'react';
import classes from './Select.module.css'
import formClasses from '../Form.module.css'

const select = (props) => {
    const selectClasses = [classes.Select];

    // Add class accordingly to change appearence
    if (props.entryType === 'expense') selectClasses.push(formClasses.Expense);
    else if (props.entryType === 'income') selectClasses.push(formClasses.Income);

    return (
        <select className={selectClasses.join(' ')} onChange={props.onChange}>
            {props.options.map( option => {
                return (
                    <option key={option.value} value={option.value}>{option.content}</option>
                )
            })}
        </select>
    )

}

export default select;