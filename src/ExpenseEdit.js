import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  Label
} from 'reactstrap';
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import AppNavbar from './AppNavbar';

class ExpenseEdit extends Component {

  emptyItem = {
    description: '',
    amount: '',
    month: 'Enero',
    year: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem,
      dropdownOpen: false,
      dropDownValue: "Enero"
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const expense = await(await fetch(`/expenses/expense/${this.props.match.params.id}`)).json();
      this.setState({item: expense});
    }
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  select(event) {
    this.setState({dropDownValue: event.target.innerText});
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {
      ...this.state.item
    };
    console.log("----------------");
    console.log(target);
    item[name] = value;
    this.setState({item});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;

    await fetch(
      (item.id)
      ? '/expenses/expense/' + (
      item.id)
      : '/expenses/expense', {
      method: (item.id)
        ? 'PUT'
        : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    });
    this.props.history.push('/expenses');
  }

  render() {
    const {item} = this.state;
    const title = <h2>{
        item.id
          ? 'Edit Expense'
          : 'Add Expense'
      }</h2>;

    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input type="text" name="description" id="description" value={item.description || ''} onChange={this.handleChange} autoComplete="description"/>
            <Label for="amount">Amount</Label>
            <Input type="text" name="amount" id="amount" value={item.amount || ''} onChange={this.handleChange} autoComplete="amount"/>
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle caret="caret">
                {this.state.item.month}
              </DropdownToggle>
              <DropdownMenu onChange={this.handleChange}>
                <DropdownItem onClick={this.handleChange} name="month" value="Enero">Enero</DropdownItem>
                <DropdownItem divider="divider"/>
                <DropdownItem onClick={this.handleChange} name="month" value="Febrero">Febrero</DropdownItem>
                <DropdownItem divider="divider"/>
                <DropdownItem onClick={this.handleChange} name="month" value="Marzo">Marzo</DropdownItem>
                <DropdownItem divider="divider"/>
                <DropdownItem onClick={this.handleChange} name="month" value="Abril">Abril</DropdownItem>
                <DropdownItem divider="divider"/>
                <DropdownItem onClick={this.handleChange} name="month" value="Mayo">Mayo</DropdownItem>
                <DropdownItem divider="divider"/>
                <DropdownItem onClick={this.handleChange} name="month" value="Junio">Junio</DropdownItem>
                <DropdownItem divider="divider"/>
                <DropdownItem onClick={this.handleChange} name="month" value="Julio">Julio</DropdownItem>
                <DropdownItem divider="divider"/>
                <DropdownItem onClick={this.handleChange} name="month" value="Agosto">Agosto</DropdownItem>
                <DropdownItem divider="divider"/>
                <DropdownItem onClick={this.handleChange} name="month" value="Septiembre">Septiembre</DropdownItem>
                <DropdownItem divider="divider"/>
                <DropdownItem onClick={this.handleChange} name="month" value="Octubre">Octubre</DropdownItem>
                <DropdownItem divider="divider"/>
                <DropdownItem onClick={this.handleChange} name="month" value="Noviembre">Noviembre</DropdownItem>
                <DropdownItem divider="divider"/>
                <DropdownItem onClick={this.handleChange} name="month" value="Diciembre">Diciembre</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Label for="amount">Year</Label>
            <Input type="text" name="year" id="year" value={item.year || ''} onChange={this.handleChange} autoComplete="year"/>
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
