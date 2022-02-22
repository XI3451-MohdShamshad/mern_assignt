



import React, { Component } from 'react'

class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dummyData: [
        { id: 1, name: 'Wasif', email: 'wasif@email.com', password:"123", role:"Admin" },
        { id: 1, name: 'rohan', email: 'rohan@email.com', password:"123", role:"Admin" },
        { id: 1, name: 'mohan', email: 'mohan@email.com', password:"123", role:"Admin" },
        { id: 1, name: 'ravi', email: 'ravi@email.com', password:"123", role:"Admin" },
      ],
      originalRows:'',
      error:''
    }
    
  }

    componentDidMount(){
    let self = this;
    fetch('http://localhost:8080/users', {
      method: 'get',
      datatype: 'json',
    }).then((Response) => Response.json())
      .then((result) => {
        if (result.length>0) {
          self.setState({originalRows:result})
        }
        else
          return self.setState({ error: 'Error' });
      })
  }

  fakeTable() {
    return this.state.dummyData.map((rows, index) => {
      const { id, name, email, password, role } = rows;
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{email}</td>
          <td>{password}</td>
          <td>{role}</td>
        </tr>
      )
    })
  }

  renderTableData() {
    return this.state.originalRows.map((rows, index) => {
      const { id, name, email, password, role } = rows;
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{email}</td>
          <td>{password}</td>
          <td>{role}</td>
        </tr>
      )
    })
  }

  render() {
    return (
      <div className='container'>
        <h1 id='title'>Users table</h1>
        <table id='students' className='table'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Role</th>
            </tr></thead>
          <tbody>
            {this.state.originalRows && this.state.originalRows.length>0 ? this.renderTableData:this.fakeTable()}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Table 