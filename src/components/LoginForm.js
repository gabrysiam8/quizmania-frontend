import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import AuthService from '../service/AuthService';

class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
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

        const { username, password } = this.state;
        const { history } = this.props;

        AuthService
            .login(username, password)
            .then(res => {
                AuthService.registerSuccessfulLogin(username, res.data.token);
                this.props.userHasAuthenticated(true);
                history.push('/');
            })
            .catch(err => {
                this.props.userHasAuthenticated(false);
            });
    }

    render() {
        return (
            <div className="LoginForm" onSubmit={this.handleSubmit}>
                <Form>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control required type="text" name="username" placeholder="Username" onChange={this.handleChange}/>
                    </Form.Group>
            
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required type="password" name="password" placeholder="Password" onChange={this.handleChange}/>
                    </Form.Group>
                    
                    <Button variant="primary" type="submit">
                        Log in
                    </Button>
                </Form>
            </div>
        );
    }
}

export default LoginForm;