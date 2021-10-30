import React, { Component } from 'react';
import { update } from './../UserFunctions/UserFunctions';
import jwt_decode from 'jwt-decode'
import {
   Row,
   Col,
   Card,
   Form,
   Button
  } from "react-bootstrap";

class Update extends Component {

    constructor(props) {
        super(props);
        this.state = {
          first_name: '',
          last_name: '',
          phone:'',
          email: '',
          errors: {}
        }
    
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
      }

      onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
      }
    
      onSubmit(e) {
        e.preventDefault()
        const updateUser = {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          email: this.state.email,
          phone: this.state.phone,
          token:localStorage.usertoken
        }

        update(updateUser).then(res => {
          alert('updated');
          this.props.history.push(`/profile`);
          //window.location = '/profile'
        })
      }

      componentDidMount() {
        //this.props.history.push(`/profile`);
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
          first_name: decoded.first_name,
          last_name: decoded.last_name,
          phone: decoded.phone,
          email: decoded.email
        })
      }
      Cancel(){
        this.props.history.push(`/profile`)
      }

    render() {
      
        return (
            <div>
                <Card className="logincard">
                <Form  noValidate>
                <Form.Group controlId="formBasicEmail">
                <Form.Label>First name</Form.Label>
                <Form.Control type="text" name="first_name" placeholder="Enter Your FirstName" value={this.state.first_name} onChange={this.onChange}/>
                <Form.Text className="text-muted">
                    Don't use the pet name
                </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                <Form.Label>Second name</Form.Label>
                <Form.Control type="text" name="last_name" placeholder="Enter Your last_name" value={this.state.last_name} onChange={this.onChange}/>
                <Form.Text className="text-muted">
                </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="number" name="phone" placeholder="Enter Your Contact Number" value={this.state.phone} onChange={this.onChange}/>
                <Form.Text className="text-muted">
                Enter Your Contact Number. 
                </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name="email" placeholder="Enter Your Email" value={this.state.email} onChange={this.onChange}/>
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
                </Form.Group>
                
                <Row>
                  <Col>
                  <Button variant="outline-primary" onClick={this.onSubmit}>
                Submit
                </Button>
                  </Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col>
                  <Button variant="outline-danger" type="button" onClick={this.Cancel.bind(this)} >
                Cancel
                </Button>
                  </Col>
                </Row>


                </Form>
                </Card>
            </div>
        )
    }
}

export default Update;