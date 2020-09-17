import React from 'react';
import EntryItem from './EntryItem/EntryItem';
import classes from './EntryList.module.css';
import { calculatePercentage } from '../../utils';

const entryList = (props) => {
    let title = 'Income', titleClasses = [classes.Title];

    if (props.type ==='expense') {
        title = 'Expense';
        titleClasses.push(classes.Expense);
    }

    const entries = props.list.map( entry => {
        return (
            <EntryItem
                description={entry.description}
                value={entry.value}
                percentage={calculatePercentage(entry.value, props.total)}
                type={props.type}/>
        )
    })

    return (
        <div className={classes.EntryList}>
            <div className={classes.Header + ' clearfix'}>
                <div className={titleClasses.join(' ')}>{title}</div>

                <div className={classes.Sort}>
                        <input type="radio" name="income_sort_method" id="income_sort_date" checked="checked" value="date"/>
                        <label htmlFor="income_sort_date"><i className="far fa-calendar-alt"></i></label>
                        <input type="radio" name="income_sort_method" id="income_sort_description" value="description"/>
                        <label htmlFor="income_sort_description"><i className="fas fa-sort-alpha-down"></i></label>
                        <input type="radio" name="income_sort_method" id="income_sort_value" value="value"/>
                        <label htmlFor="income_sort_value"><i className="fas fa-dollar-sign"></i></label>
                </div>
            </div>

            <div>
                {entries}
            </div>
        </div>
    )

}

export default entryList;