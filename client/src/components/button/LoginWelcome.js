
import React, { Component } from 'react'
import {Row,
  Container,
  Button,
  Col
  } from "react-bootstrap";
import jwt_decode from 'jwt-decode'

class profilewel extends Component {
  constructor() {
    super()
    this.state = {
      first_name: '',
      email: '',
      errors: {}
    }
  }

logout(){
    localStorage.removeItem('usertoken')
}

  componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      first_name: decoded.first_name,
      email: decoded.email
    })
  }

  render() {
    return (
            <Container>
            <Row>
            <h5>Welcome <b>{this.state.first_name}</b></h5>
            <h6>{this.state.email}</h6>
            </Row>
            <hr />
            <Row>
            <Col><Button variant="outline-success" href="/profile">PROFILE</Button></Col>
            <Col></Col>
            <Col><Button variant="outline-danger" onClick={this.logout.bind(this)} href="/">LOGOUT</Button></Col>
            </Row> 
            </Container>
    )
  }
}

export default profilewel