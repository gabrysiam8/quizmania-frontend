import React, { Component } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import API from "../../utils/API";
import PasswordStrengthBar from 'react-password-strength-bar';
import SweetAlert from 'react-bootstrap-sweetalert';

class ChangePasswordForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            oldPassword: "",
            newPassword: "",
            passwordConfirmation: "",
            validated: false,
            showMessage: false,
            message: "",
            alert: null
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
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.stopPropagation();
        } else {
            this.refs.btn.setAttribute("disabled", "disabled"); 

            const { oldPassword, newPassword, passwordConfirmation } = this.state;
            const { history } = this.props;

            API.put("/user/me/password", { oldPassword, newPassword, passwordConfirmation })
                .then((res) => {
                    const successAlert = <SweetAlert success title="Success!" confirmBtnText="Ok" onConfirm={() => history.push('/user/me')}>
                                            {res.data}
                                        </SweetAlert>
                    this.setState({
                        alert: successAlert
                    });
                })
                .catch(err => {
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
        return (
            <div className="ChangePasswordForm">
                <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                    <Form.Group controlId="oldPassword">
                        <Form.Label>Old password</Form.Label>
                        <Form.Control required type="password" name="oldPassword" placeholder="Old password" onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="newPassword">
                        <Form.Label>New password</Form.Label>
                        <Form.Control required type="password" name="newPassword" placeholder="New password" minLength="4" onChange={this.handleChange}/>
                        <PasswordStrengthBar password={this.state.newPassword} />
                    </Form.Group>
            
                    <Form.Group controlId="password">
                        <Form.Label>Password confirmation</Form.Label>
                        <Form.Control required type="password" name="passwordConfirmation" placeholder="Password confirmation" minLength="4" onChange={this.handleChange}/>
                    </Form.Group>

                    <Button ref="btn" variant="info" type="submit">
                        Change password
                    </Button>
                </Form>
                {this.state.showMessage ? 
                    <Alert className="dangerAlert" variant="danger">
                        <p>{this.state.message}</p>
                    </Alert>
                    :
                    null
                }
                {this.state.alert}
            </div>
        );
    }
}

export default ChangePasswordForm;