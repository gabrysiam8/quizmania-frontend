import React, { Component, Fragment } from 'react';
import { Form, Button, Alert, Modal } from 'react-bootstrap';
import AuthService from '../../service/AuthService';
import API from '../../utils/API';

class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            username: "",
            password: "",
            showModal: false,
            showMessage: false,
            message: "",
            validated: false,
            resetPassword: false
        };

        this.renderControls = this.renderControls.bind(this);
        this.handleForgotPassword = this.handleForgotPassword.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    renderControls() {
        if(this.state.resetPassword)
            return (
                <Form.Group controlId="email">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control required type="email" name="email" placeholder="E-mail" onChange={this.handleChange}/>
                </Form.Group>
            );
        return (
            <Fragment>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control required type="text" name="username" placeholder="Username" onChange={this.handleChange}/>
                </Form.Group>
                
                <Form.Group className="passwordInput" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type="password" name="password" placeholder="Password" onChange={this.handleChange}/>
                    <Button variant="link" size="sm" onClick={this.handleForgotPassword}>Forgot your password?</Button>
                </Form.Group>
            </Fragment>
        );
    }

    handleForgotPassword(event) {
        this.setState({
            resetPassword: true
        });
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
            this.refs.btn.setAttribute("disabled", "disabled"); 

            const { email, username, password } = this.state;
            const { history } = this.props;
            this.state.resetPassword ?
                API
                    .get("/auth/resetPassword?email="+email)
                    .then(res => {
                        this.setState({
                            showModal: true
                        });
                    })
                    .catch(err => {
                        this.setState({
                            showMessage: true,
                            message: err.response.data
                        });
                        this.refs.btn.removeAttribute("disabled");
                    })
            :
                AuthService
                    .login(username, password)
                    .then(res => {
                        AuthService.registerSuccessfulLogin(username, res.data.token);
                        this.props.userHasAuthenticated(true);
                        history.push('/');
                    })
                    .catch(err => {
                        this.props.userHasAuthenticated(false);
                        this.setState({
                            showMessage: true,
                            message: err.response.data
                        });
                        this.refs.btn.removeAttribute("disabled");
                    });
        }
        this.setState({ validated: true });
    }

    render() {
        const formControls = this.renderControls();

        return (
            <div className="LoginForm">
                <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit} >
                    {formControls}
                    
                    <Button ref="btn" variant="info" type="submit">
                        {this.state.resetPassword ? 'Reset password' : 'Log in'}
                    </Button>
                </Form>
                {this.state.showMessage ? 
                    <Alert className="dangerAlert" variant="danger">
                        <p>{this.state.message}</p>
                    </Alert>
                    :
                    null
                }
                <Modal size="lg" show={this.state.showModal} onHide={this.togglePopup}>
                    <Modal.Header closeButton>
                        <Modal.Title>Almost done...</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>An email was sent to: {this.state.email}.
                        Open this email and click the link to reset your password.</p>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default LoginForm;