import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Row,
  Col,
  Card,
  Form,
  Button
} from "react-bootstrap";

export default function Register(props) {
  const [register, setRegister] = useState([])
  const [item, setItem] = useState([])


  useEffect(() => {
    if (item.length !== 0) {
      axios.post('http://localhost:5000/users/register', register)
        .then(response => {
          alert('Registered')
          props.history.push(`/login`)
        }).catch(err => {
          alert('user already exist')
        })
    }
  }, [item])

  return (
    <React.Fragment>
      <Card className="logincard">
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>First name</Form.Label>
            <Form.Control type="text" placeholder="Enter FirstName" name="first_name" onChange={(e) => { setRegister({ ...register, [e.target.name]: e.target.value }) }} min="5" />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Second name</Form.Label>
            <Form.Control type="text" name="last_name" placeholder="Enter your last_name" onChange={(e) => { setRegister({ ...register, [e.target.name]: e.target.value }) }} />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="number" placeholder="Enter Phone Number" name="phone" onChange={(e) => { setRegister({ ...register, [e.target.name]: e.target.value }) }} />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="email" onChange={(e) => { setRegister({ ...register, [e.target.name]: e.target.value }) }} />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Password" onChange={(e) => { setRegister({ ...register, [e.target.name]: e.target.value }) }} />
          </Form.Group>

          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Row>
            <Col>
              <Button variant="outline-primary" onClick={() => { setItem({ hi: "hi" }) }}>
                Submit
                  </Button>
            </Col>
            <Col></Col><Col></Col>
            <Col>
              <Button variant="outline-danger" type="button" href="/">
                Cancel
                  </Button>
            </Col>
          </Row>
        </Form>
        <h6>Already have a account? <span><a className="usechange" href="/login">Login</a></span></h6>
      </Card>
    </React.Fragment>
  )
}
