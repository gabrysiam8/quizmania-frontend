import React, { Component } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import AuthService from '../service/AuthService';
import PasswordStrengthBar from 'react-password-strength-bar'

class RegisterForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            username: "",
            password: "",
            validated: false,
            showModal: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.stopPropagation();
        } else {
            const { email, username, password } = this.state;

            AuthService
                .register(email, username, password)
                .then(() => {
                    this.setState({
                        showModal: true
                    });
                })
                .catch(err => {
                    alert(err.response.data);
                });
        }
    
        this.setState({
            validated: true
        });

    }

    togglePopup() {
        this.setState({
          showModal: !this.state.showModal
        });
        this.props.history.push('login');
    }

    render() {
        return (
            <div className="RegisterForm">
                <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                    <Form.Group controlId="email">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control required type="email" name="email" placeholder="E-mail" onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control required type="text" name="username" placeholder="Username" onChange={this.handleChange}/>
                    </Form.Group>
            
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required type="password" name="password" placeholder="Password" minLength="4" onChange={this.handleChange}/>
                        <PasswordStrengthBar password={this.state.password} />
                        </Form.Group>
                    
                    
                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </Form>
                <Modal size="lg" show={this.state.showModal} onHide={this.togglePopup}>
                    <Modal.Header closeButton>
                        <Modal.Title>Almost done...</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>A verification email was sent to: {this.state.email}.
                        Open this email and click the link to activate your account.</p>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default RegisterForm;