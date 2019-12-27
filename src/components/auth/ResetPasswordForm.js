import React, { Component } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import API from "../../utils/API";
import PasswordStrengthBar from 'react-password-strength-bar';
import qs from 'qs';
import SweetAlert from 'react-bootstrap-sweetalert';

export class ResetPasswordForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: "",
            newPassword: "",
            passwordConfirmation: "",
            showForm: false,
            validated: false,
            showMessage: false,
            message: "",
            alert: null
        };

        this.onConfirm = this.onConfirm.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onConfirm() {
        this.props.history.push({
            pathname: '/login'
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
            const { userId, newPassword, passwordConfirmation } = this.state;

            if(newPassword !== passwordConfirmation) {
                this.setState({
                    showMessage: true,
                    message: "The Password confirmation must match New password!"
                });
                this.refs.btn.removeAttribute("disabled");
            } else {
                API.put("/user/"+userId+"/password", { newPassword, passwordConfirmation })
                    .then((res) => {
                        const successAlert = <SweetAlert 
                                                success 
                                                title="Success!" 
                                                confirmBtnText="Log in" 
                                                confirmBtnBsStyle="info" 
                                                onConfirm={this.onConfirm}
                                            >
                                                Password was successfully reset!
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
        }
        this.setState({ validated: true });
    }

    componentDidMount() {
        const query = qs.parse(this.props.location.search, {
            ignoreQueryPrefix: true
        });
        console.log(query.token)
        API.get("/confirmation?token="+query.token)
            .then((res) => {
                this.setState({ 
                    userId: res.data.user.id,
                    showForm: true 
                });
            })
            .catch(err => {
                this.setState({
                    showMessage: true,
                    message: err.response.data
                });
            });
    }

    render() {
        return (
            <div className="ChangePasswordForm">
                {this.state.showForm ?
                    <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                        <Form.Group controlId="password">
                            <Form.Label>New password</Form.Label>
                            <Form.Control required type="password" name="newPassword" placeholder="New password" minLength="4" onChange={this.handleChange}/>
                            <PasswordStrengthBar password={this.state.newPassword} />
                        </Form.Group>
                
                        <Form.Group controlId="passwordConfirmation">
                            <Form.Label>Password confirmation</Form.Label>
                            <Form.Control required type="password" name="passwordConfirmation" placeholder="Password confirmation" minLength="4" onChange={this.handleChange}/>
                        </Form.Group>

                        <Button ref="btn" variant="info" type="submit">
                            Change password
                        </Button>
                    </Form>
                :
                    null
                }
                {this.state.showMessage ? 
                    <Alert className="dangerAlert" variant="danger">
                        {this.state.showForm ? null : <Alert.Heading>Cannot reset password!</Alert.Heading> }
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

export default ResetPasswordForm;
