import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Auth from './Container/Auth/Auth';
import Board from './Container/Board/Board';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/board' component={Board}/>
        <Route path='/' exact component={Auth}/>
        <Redirect to='/'/>
      </Switch>
    </div>
  );
}

export default App;
