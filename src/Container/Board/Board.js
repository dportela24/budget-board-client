import React, { Component } from 'react';
import Toolbar from '../../component/UI/Toolbar/Toolbar'
import BudgetOverview from '../../component/BudgetOverview/BudgetOverview';
import NewEntryForm from '../../component/NewEntryForm/NewEntryForm';
import classes from './Board.module.css';

class Board extends Component {
    state = {
        budget: 0,
        income: 0,
        expense: 0,
    }

    onSubmit = (type, description, value) => {
        const updatedObject = {...this.state};

        console.log(value)
        if (type==='income') {
            updatedObject.income += value;
        } else {
            updatedObject.expense += value;
        }

        updatedObject.budget = updatedObject.income - updatedObject.expense;

        this.setState(updatedObject)
    }

    render() {
        return (
            <div className={classes.Board}>
                <Toolbar onLogOut={() => console.log('log out')}/>

                <div className={classes.BudgetOverview}>
                    <BudgetOverview
                        total={this.state.budget}
                        income={this.state.income}
                        expense={this.state.expense}/>
                </div>

                <div className={classes.Form}>
                    <NewEntryForm onSubmit={this.onSubmit}/>
                </div>

                <div className={classes.BudgetLists}/>
            </div>
        )
    }
}

export default Board;