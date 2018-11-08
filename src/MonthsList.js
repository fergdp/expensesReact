import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class MonthsList extends Component {

  constructor(props) {
    super(props);
    this.state = {months: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('months/all')
      .then(response => response.json())
      .then(data => this.setState({months: data, isLoading: false}));
  }

  async remove(id) {
    await fetch(`/months/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedMonths = [...this.state.months].filter(i => i.id !== id);
      this.setState({months: updatedMonths});
    });
  }

  render() {
    const {months, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const monthsList = months.map(month => {
      const name = `${month.name || ''}`;
      return <tr key={month.id}>
        <td style={{whiteSpace: 'nowrap'}}>{month.id}</td>
        <td>{name}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/months/" + month.id}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(month.id)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/months/new">Add Month</Button>
          </div>
          <h3>Months</h3>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="20%">Id</th>
              <th width="70%">Name</th>
              <th width="10%">Actions</th>
            </tr>
            </thead>
            <tbody>
            {monthsList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default MonthsList;
