import React, { Component } from "react";
import API from "../utils/API";

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
                <form onSubmit={this.handleSubmit}>
                    <p>Old password:</p>
                    <input type="password" name="oldPassword" value={this.state.oldPassword} onChange={this.handleChange} required/> <br/>
                    <p>New password:</p>
                    <input type="password" name="newPassword" value={this.state.newPassword} onChange={this.handleChange} required/> <br/>
                    <p>New password confirmation:</p>
                    <input type="password" name="passwordConfirmation" value={this.state.passwordConfirmation} onChange={this.handleChange} required/> <br/>
                    <input type="submit" value="Change password"/>
                </form>
            </div>
        );
    }
}

export default ChangePasswordForm;