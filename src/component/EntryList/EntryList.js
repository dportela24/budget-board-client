import React from 'react';
import EntryItem from './EntryItem/EntryItem';
import classes from './EntryList.module.css';
import { calculatePercentage } from '../../utils';

const entryList = (props) => {
    let title = 'Income', titleClasses = [classes.Title];

    // Add class accordingly to change appearence
    if (props.type ==='expense') {
        title = 'Expense';
        titleClasses.push(classes.Expense);
    }

    const entries = props.list.map( entry => {
        return (
            <EntryItem
                key={entry._id}
                description={entry.description}
                value={entry.value}
                percentage={calculatePercentage(entry.value, props.total)}
                onDeleteEntry={() => props.onDeleteEntry(entry._id, props.type)}
                type={props.type}/>
        )
    })

    return (
        <div className={classes.EntryList}>
            <div className={classes.Header + ' clearfix'}>
                <div className={titleClasses.join(' ')}>{title}</div>

                <div className={classes.Sort} onChange={(e) => props.onChangeSortMethod(props.type, e.target.value)}>
                        <input type="radio" name={`${props.type}_sort`} id={`${props.type}_sort_date`} defaultChecked value="date"/>
                        <label htmlFor={`${props.type}_sort_date`}><i className="far fa-calendar-alt"></i></label>

                        <input type="radio" name={`${props.type}_sort`} id={`${props.type}_sort_description`} value="description"/>
                        <label htmlFor={`${props.type}_sort_description`}><i className="fas fa-sort-alpha-down"></i></label>

                        <input type="radio" name={`${props.type}_sort`} id={`${props.type}_sort_value`} value="value"/>
                        <label htmlFor={`${props.type}_sort_value`}><i className="fas fa-dollar-sign"></i></label>
                </div>
            </div>

            <div>
                {entries}
            </div>
        </div>
    )

}

export default entryList;