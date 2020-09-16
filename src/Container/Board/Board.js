import React, { Component } from 'react';
import BudgetOverview from '../../component/BudgetOverview/BudgetOverview';
import Toolbar from '../../component/UI/Toolbar/Toolbar'
import classes from './Board.module.css'

class Board extends Component {
    state = {
        budget: 400000,
        income: 400000,
        expense: 2000000,
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

                <div className={classes.BudgetLists}/>
            </div>
        )
    }
}

export default Board;