import React from 'react';
import { formatValue } from '../../../utils';
import classes from './EntryItem.module.css';

const entryItem = (props) => {
    const valueClasses = [classes.Value], percentageClasses = [classes.Percentage];

    if (props.type === 'expense') {
        valueClasses.push(classes.Expense);
        percentageClasses.push(classes.Expense);
    }

    return (
        <div className={classes.EntryItem + ' clearfix'}>
            <div className={classes.Description}>{props.description}</div>

            <div className={'right'}>
                <div className={valueClasses.join(' ')}>{formatValue(props.value)}</div>
                <div className={percentageClasses.join(' ')}>{props.percentage}</div>
                <div className={classes.Delete}>
                    <button><i className="far fa-trash-alt"></i></button>
                </div>
            </div>
        </div>
    )
}

export default entryItem;