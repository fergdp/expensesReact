import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MonthsList from './MonthsList';
import MonthEdit from './MonthEdit';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/months' exact={true} component={MonthsList}/>
          <Route path='/months/:id' component={MonthEdit}/>
        </Switch>
      </Router>
    )
  }
}

export default App;
