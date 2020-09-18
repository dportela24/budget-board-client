import React from 'react';
import BudgetToast from './BudgetToast/BudgetToast';
import {formatValue, calculatePercentage} from '../../utils';
import classes from './BudgetOverview.module.css';

const budgetOverview = (props) => {
    const classesValue = [classes.Value];

    // Add class accordingly to change appearence
    if (props.total < 0) {
        classesValue.push(classes.Negative);
    }

    return (
        <div className={classes.BudgetOverview}>
            <div className={classes.Title}>
                Your current budget:
            </div>
            
            <div className={classesValue.join(' ')}>{formatValue(props.total)}</div>
            
            <BudgetToast 
                type="income"
                value={formatValue(props.income, 'income')}/>
            <BudgetToast
                type="expense"
                value={formatValue(props.expense, 'expense')}
                percentage={calculatePercentage(props.expense,props.income)}/>
        </div>
    )
}

export default budgetOverview;