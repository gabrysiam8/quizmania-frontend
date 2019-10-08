import React, { Component } from "react";
import AuthService from "../service/AuthService";

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
                <form onSubmit={this.handleSubmit}>
                    <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required/> <br/>
                    <input type="text" name="username" value={this.state.username} onChange={this.handleChange} required/> <br/>
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required/> <br/>
                    <input type="submit" value="Register"/>
                </form>
            </div>
        );
    }
}

export default RegisterForm;