import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Auth from './Container/Auth/Auth';
import Board from './Container/Board/Board';
import LogOut from './Container/Auth/LogOut/LogOut'

class App extends Component{
  render () {
    return (
      <div className="App">
        <Switch>
          <Route path='/board' component={Board}/>
          <Route path="/logout" component={LogOut}/>
          <Route path='/' exact component={Auth}/>
          <Redirect to='/'/>
        </Switch>
      </div>
    );
  }
}

export default App;
