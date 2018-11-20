import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class ExpensesList extends Component {

  constructor(props) {
    super(props);
    this.state = {expenses: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('expenses/all')
      .then(response => response.json())
      .then(data => this.setState({expenses: data, isLoading: false}));
  }

  async remove(id) {
    await fetch(`/expenses/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedExpenses = [...this.state.expenses].filter(i => i.id !== id);
      this.setState({expenses: updatedExpenses});
    });
  }

  render() {
    const {expenses, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const expensesList = expenses.map(expense => {
      const description = `${expense.description || ''}`;
      const amount = `${expense.amount || ''}`;
      const month = `${expense.month || ''}`;
      const year = `${expense.year || ''}`;
      return <tr key={expense.id}>
        <td style={{whiteSpace: 'nowrap'}}>{expense.id}</td>
        <td>{description}</td>
        <td>{amount}</td>
        <td>{month}</td>
        <td>{year}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/expenses/" + expense.id}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(expense.id)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/expenses/new">Add Expense</Button>
          </div>
          <h3>Expenses</h3>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="10%">Id</th>
              <th width="20%">description</th>
              <th width="20%">Amount</th>
              <th width="20%">Month</th>
              <th width="10%">Year</th>
              <th width="20%">Actions</th>
            </tr>
            </thead>
            <tbody>
            {expensesList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }

}
export default ExpensesList;
