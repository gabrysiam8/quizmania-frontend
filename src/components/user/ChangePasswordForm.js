import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import API from "../../utils/API";

class ChangePasswordForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            oldPassword: "",
            newPassword: "",
            passwordConfirmation: ""
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

        const { oldPassword, newPassword, passwordConfirmation } = this.state;
        const { history } = this.props;

        API.put("/user/me/password", { oldPassword, newPassword, passwordConfirmation })
            .then((res) => {
                alert(res.data);
                history.push('/');
            })
            .catch(err => {
                alert(err.response.data);
            });
    }

    render() {
        return (
            <div className="ChangePasswordForm">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="oldPassword">
                        <Form.Label>Old password</Form.Label>
                        <Form.Control required type="password" name="oldPassword" placeholder="Old password" onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="newPassword">
                        <Form.Label>New password</Form.Label>
                        <Form.Control required type="password" name="newPassword" placeholder="New password" onChange={this.handleChange}/>
                    </Form.Group>
            
                    <Form.Group controlId="password">
                        <Form.Label>Password confirmation</Form.Label>
                        <Form.Control required type="password" name="passwordConfirmation" placeholder="Password confirmation" onChange={this.handleChange}/>
                    </Form.Group>

                    <Button variant="info" type="submit">
                        Change password
                    </Button>
                </Form>
            </div>
        );
    }
}

export default ChangePasswordForm;