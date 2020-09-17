import React, { Component } from 'react';
import Toolbar from '../../component/UI/Toolbar/Toolbar'
import BudgetOverview from '../../component/BudgetOverview/BudgetOverview';
import NewEntryForm from './NewEntryForm/NewEntryForm';
import EntryList from '../../component/EntryList/EntryList';
import classes from './Board.module.css';
import axios from '../../axios';

class Board extends Component {
    state = {
        budget: 0,
        income: 0,
        expense: 0,
        incomeSort: 'date',
        incomeList: [],
        expenseSort: 'date',
        expenseList: [],
    }

    componentDidMount = () => {
        const token = this.props.location.state.token;

        axios.get('/all-entries?auth=' + token)
        .then( response => {
            const fetchedIncomes = response.data.incomes;
            const fetchedExpenses = response.data.expenses;

            this.sortList(fetchedIncomes, this.state.incomeSort);
            this.sortList(fetchedExpenses, this.state.expenseSort);

            console.log(fetchedIncomes);
            const incomeTotal = fetchedIncomes.reduce( (sum, income) => sum += income.value, 0);
            const expenseTotal = fetchedExpenses.reduce( (sum, expense) => sum += expense.value, 0);
            const budgetTotal = incomeTotal - expenseTotal;

            this.setState({
                budget: budgetTotal,
                income: incomeTotal,
                expense: expenseTotal,
                incomeList: fetchedIncomes,
                expenseList: fetchedExpenses,
                token
            })
        })
        .catch( error => {
            console.log(error);
        })
    }

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

    sortList = (list, sortMethod) => {
        list.sort( (prev, next) => {
            let a = prev[sortMethod], b = next[sortMethod];

            if (sortMethod === 'description') {
                // Alphabetically Z > A, swap a with b to
                // sort from Z->A to A->Z
                const c = a.toLowerCase();
                a = b.toLowerCase();
                b = c.toLowerCase();
            }

            if (a > b) return -1;
            if (b > a) return 1;
            return 0
        });
    }

    onSubmit = (type, description, value) => {
        
        axios.post(`/${type}?auth=${this.state.token}`, {description, value})
        .then( response => {
            const _id = response.data._id;
            const date = response.data.date;

            const updatedList = [
                ...this.state[`${type}List`]
            ]
            
            updatedList.push({
                description,
                value,
                date,
                _id
            })

            console.log(updatedList);
            
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
        console.log(type)
        axios.delete(`/${type}/${_id}?auth=${this.state.token}`)
        .then( response => {
            const updatedList = [...this.state[`${type}List`]]

            const index = updatedList.findIndex( (entry) => entry._id === _id);

            const removedElement = updatedList.splice(index, 1)[0];

            this.setState({[`${type}List`]: updatedList})

            console.log(removedElement)

            this.updateTotals(type, -removedElement.value);
        })
        .catch( e => {
            console.log(e.response);
            if (e.response.data) {
                alert(e.response.data)
            } else {
                alert('Could not connect to database....')
            }
        })
        
    }

    onChangeSortMethod = (type, sortMethod) => {
        let updatedList = [...this.state[`${type}List`]];
        this.sortList(updatedList, sortMethod);

        this.setState({[`${type}List`]: updatedList})
    }

    render() {
        // console.log(this.state.incomeList);
        // console.log(this.state.expenseList);
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
                    <EntryList type='income' sort={this.state.incomeSort} list={this.state.incomeList} total={this.state.income} onDeleteEntry={this.onDeleteEntry} onChangeSortMethod={this.onChangeSortMethod}/>
                    <EntryList type='expense' sort={this.state.expenseSort} list={this.state.expenseList} total={this.state.income} onDeleteEntry={this.onDeleteEntry} onChangeSortMethod={this.onChangeSortMethod}/>
                </div>
            </div>
        )
    }
}

export default Board;