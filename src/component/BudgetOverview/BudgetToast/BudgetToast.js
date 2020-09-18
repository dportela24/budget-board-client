import React from 'react';
import classes from './BudgetToast.module.css';

const budgetToast = (props) => {
    let toastClasses = [classes.BudgetToast, 'clearfix'];
    let percentageClasses = [classes.Percentage];

    // Add class accordingly to change appearence
    if (props.type === "expense") {
        toastClasses.push(classes.Expense);
        percentageClasses.push(classes.Expense);
    }
    return (
        <div className={toastClasses.join(' ')}>
            <div className={classes.Title}>{props.type}</div>
            <div className='right'>
                <div className={classes.Value}>{props.value}</div>
                <div className={percentageClasses.join(' ')}>{props.percentage}</div>
            </div>
        </div>
    )
}

export default budgetToast;