import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ExpensesList from './ExpensesList';
import ExpenseEdit from './ExpenseEdit';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/expenses' exact={true} component={ExpensesList}/>
          <Route path='/expenses/:id' component={ExpenseEdit}/>
        </Switch>
      </Router>
    )
  }
}

export default App;
