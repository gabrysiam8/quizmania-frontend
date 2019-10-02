import React , {Component} from 'react';
import AuthenticationService from '../service/AuthenticationService';

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

        const {username, password }= this.state;
        AuthenticationService
            .executeAuthenticationService(username, password)
            .then(res => {
                AuthenticationService.registerSuccessfulLogin(username, res.data.token);
                this.props.history.push('/');
            })
            .catch(err => {
                alert(err.response.data);
            });
    }

    render() {
        return (
            <div className="LoginForm">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="username" value={this.state.username} onChange={this.handleChange} required/> <br/>
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required/> <br/>
                    <input type="submit" value="Log in"/>
                </form>
            </div>
        );
    }
}

export default LoginForm;