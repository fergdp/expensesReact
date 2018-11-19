import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class ExpenseEdit extends Component {

  emptyItem = {
    description: '',
    amount: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const expense = await (await fetch(`/expenses/expense/${this.props.match.params.id}`)).json();
      this.setState({item: expense});
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;

    await fetch((item.id) ? '/expenses/expense/' + (item.id) : '/expenses/expense', {
      method: (item.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/expenses');
  }

  render() {
    const {item} = this.state;
    const title = <h2>{item.id ? 'Edit Expense' : 'Add Expense'}</h2>;

    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="description">Description</Label>
                <Input type="text" name="description" id="description" value={item.description || ''}
                    onChange={this.handleChange} autoComplete="description"/>
            <Label for="amount">Amount</Label>
                <Input type="text" name="amount" id="amount" value={item.amount || ''}
                    onChange={this.handleChange} autoComplete="amount"/>
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/expenses">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(ExpenseEdit);
