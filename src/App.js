import "bootstrap/dist/css/bootstrap.min.css";
import React , {Component} from "react";
import "./App.css";
import { Switch } from "react-router-dom";
import AuthService from "./service/AuthService";
import LoginForm from "./components/LoginForm";
import StartPage from "./components/StartPage";
import AppliedRoute from "./components/AppliedRoute";
import MainMenu from "./components/MainMenu";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false
        };

        this.userHasAuthenticated = this.userHasAuthenticated.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    userHasAuthenticated(authenticated) {
        this.setState({ isAuthenticated: authenticated });
    }

    componentDidMount(){
        this.userHasAuthenticated(AuthService.isAuthenticated());
    }

    handleLogout() {
        AuthService
            .logout();
        this.userHasAuthenticated(false );
    }

    render() {
        const childProps = {
            isAuthenticated: this.state.isAuthenticated,
            userHasAuthenticated: this.userHasAuthenticated,
            onLogout: this.handleLogout
        };
        return (
            <div>
                <MainMenu {...childProps}/>
                <Switch>
                    <AppliedRoute path="/" exact component={StartPage} props={childProps}/>
                    <AppliedRoute path="/login" exact component={LoginForm} props={childProps}/>
                    <AppliedRoute path="/register" exact component={LoginForm} props={childProps}/>
                </Switch>
            </div>
        );
    }
}

export default App;
