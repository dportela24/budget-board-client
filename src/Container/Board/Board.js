import React, { Component } from 'react';
import Toolbar from '../../component/UI/Toolbar/Toolbar'
import BudgetOverview from '../../component/BudgetOverview/BudgetOverview';
import NewEntryForm from '../../component/NewEntryForm/NewEntryForm';
import EntryList from '../../component/EntryList/EntryList';
import classes from './Board.module.css';
import axios from '../../axios';
import { compareEntries, insertSorted, getStoredAuth } from '../../utils';

class Board extends Component {
    state = {
        username: '',
        budget: 0,
        income: 0,
        expense: 0,
        incomeSort: 'date',
        incomeList: [],
        expenseSort: 'date',
        expenseList: [],
        token: ''
    }

    componentDidMount = () => {
        // Check if token stored in localStorage
        const auth = getStoredAuth();
        if (!auth.token) {
            this.props.history.replace('/');
        }

        axios.get('/all-entries?auth=' + auth.token)
        .then( response => {
            const fetchedIncomes = response.data.incomes;
            const fetchedExpenses = response.data.expenses;

            fetchedIncomes.sort( (a, b) => compareEntries(a,b, this.state.incomeSort))
            fetchedExpenses.sort( (a, b) => compareEntries(a,b, this.state.expenseSort))

            const incomeTotal = fetchedIncomes.reduce( (sum, income) => sum += income.value, 0);
            const expenseTotal = fetchedExpenses.reduce( (sum, expense) => sum += expense.value, 0);
            const budgetTotal = incomeTotal - expenseTotal;

            this.setState({
                username: auth.username,
                budget: budgetTotal,
                income: incomeTotal,
                expense: expenseTotal,
                incomeList: fetchedIncomes,
                expenseList: fetchedExpenses,
                token: auth.token
            })
        })
        .catch( error => {
            console.log(error);
        })
    }

    // Update overview values
    updateTotals = (type, value) => {
        const updatedTotals = {
            budget: this.state.budget,
            income: this.state.income,
            expense: this.state.expense
        }

        updatedTotals[`${type}`] += value;
        updatedTotals.budget = updatedTotals.income - updatedTotals.expense;

        this.setState({...updatedTotals});
    }

    onAddNewEntry = (type, description, value) => {
        axios.post(`/${type}?auth=${this.state.token}`, {description, value})
        .then( response => {
            const _id = response.data._id;
            const date = response.data.date;

            const updatedList = [
                ...this.state[`${type}List`]
            ]
            
            const newEntry = {
                description,
                value,
                date,
                _id
            }

            insertSorted(updatedList, newEntry, this.state[`${type}Sort`]);
            
            this.setState({
                [`${type}List`]: updatedList
            })

            this.updateTotals(type, value);
        })
        .catch( e => {
            console.log(e);

            if (e.response.data) {
                alert(e.response.data)
            } else {
                alert('Could not connect to database....')
            }
        })
    }

    onDeleteEntry = (_id, type) => {
        axios.delete(`/${type}/${_id}?auth=${this.state.token}`)
        .then( response => {
            const updatedList = [...this.state[`${type}List`]];

            const index = updatedList.findIndex( (entry) => entry._id === _id);

            const removedElement = updatedList.splice(index, 1)[0];

            this.setState({[`${type}List`]: updatedList})

            this.updateTotals(type, -removedElement.value);
        })
        .catch( e => {
            console.log(e.response);
            if (e.response) {
                alert(e.response.data)
            } else {
                alert('Could not connect to database....');
            }
        })
        
    }

    onChangeSortMethod = (type, sortMethod) => {
        let updatedList = [...this.state[`${type}List`]];

        updatedList.sort( (a, b) => compareEntries(a,b, sortMethod))

        this.setState({
            [`${type}List`]: updatedList,
            [`${type}Sort`]: sortMethod})
    }

    render() {
        return (
            <div className={classes.Board}>
                <Toolbar username={this.state.username}/>

                <div className={classes.BudgetOverview}>
                    <BudgetOverview
                        total={this.state.budget}
                        income={this.state.income}
                        expense={this.state.expense}/>
                </div>

                <div className={classes.Form}>
                    <NewEntryForm onSubmit={this.onAddNewEntry}/>
                </div>

                <div className={classes.BudgetLists}>
                    <EntryList type='income' 
                        sort={this.state.incomeSort} 
                        list={this.state.incomeList} 
                        total={this.state.income} 
                        onDeleteEntry={this.onDeleteEntry} 
                        onChangeSortMethod={this.onChangeSortMethod}/>

                    <EntryList type='expense' 
                        sort={this.state.expenseSort}
                        list={this.state.expenseList}
                        total={this.state.income}
                        onDeleteEntry={this.onDeleteEntry}
                        onChangeSortMethod={this.onChangeSortMethod}/>
                </div>
            </div>
        )
    }
}

export default Board;