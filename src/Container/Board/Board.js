import React, { Component } from 'react';
import Toolbar from '../../component/UI/Toolbar/Toolbar'
import BudgetOverview from '../../component/BudgetOverview/BudgetOverview';
import NewEntryForm from './NewEntryForm/NewEntryForm';
import EntryList from '../../component/EntryList/EntryList';
import classes from './Board.module.css';

class Board extends Component {
    state = {
        budget: 1000,
        income: 2000,
        expense: 0,
        incomeSort: 'date',
        incomeList: [{
            description: 'Paycheck',
            value: 1500,
        },{
            description: 'Project',
            value: 700,
        }],
        expenseSort: 'date',
        expenseList: [{
            description: 'Groceries',
            value: 50
        }],
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

                <div className={classes.BudgetLists}>
                    <EntryList type='income' sort={this.state.incomeSort} list={this.state.incomeList} total={this.state.income}/>
                    <EntryList type='expense' sort={this.state.expenseSort} list={this.state.expenseList} total={this.state.income}/>
                </div>
            </div>
        )
    }
}

export default Board;