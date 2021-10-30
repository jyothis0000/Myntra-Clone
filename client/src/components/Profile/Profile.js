import React, { Component } from 'react'
import { Row,Col,Button } from 'react-bootstrap'
// import { getProfile } from './../UserFunctions/UserFunctions';
import jwt_decode from 'jwt-decode'


class Profile extends Component {
  constructor() {
    super()
    this.state = {
      first_name: '',
      last_name: '',
      phone: '',
      email: '',
      errors: {}
    }
  }

  componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      first_name: decoded.first_name,
      last_name: decoded.last_name,
      phone: decoded.phone,
      email: decoded.email
    })
  }


  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">PROFILE</h1>
          </div>
          <table className="table col-md-6 mx-auto">
            <tbody>
              <tr>
                <td>Fist Name</td>
                <td>{this.state.first_name}</td>
              </tr>
              <tr>
                <td>Last Name</td>
                <td>{this.state.last_name}</td>
              </tr>
              <tr>
                <td>Phone</td>
                <td>{this.state.phone}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{this.state.email}</td>
              </tr>
            </tbody>
          </table>
          <Row>
            <Col></Col>
            <Col></Col>
            <Col><Button variant="outline-dark" href="/update">EDIT</Button></Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default Profile
