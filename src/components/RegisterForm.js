import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import AuthService from '../service/AuthService';

class RegisterForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            username: "",
            password: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const { email, username, password } = this.state;
        const { history } = this.props;

        AuthService
            .register(email, username, password)
            .then(() => {
                history.push('/login');
            })
            .catch(err => {
                alert(err.response.data);
            });
    }

    render() {
        return (
            <div className="RegisterForm">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="email">
                        <Form.Label>Username</Form.Label>
                        <Form.Control required type="email" name="email" placeholder="Enter e-mail" onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control required type="text" name="username" placeholder="Enter username" onChange={this.handleChange}/>
                    </Form.Group>
            
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required type="password" name="password" placeholder="Password" onChange={this.handleChange}/>
                    </Form.Group>
                    
                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </Form>
            </div>
        );
    }
}

export default RegisterForm;