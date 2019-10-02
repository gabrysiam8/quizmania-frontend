import React , {Component} from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import AuthenticatedRoute from './components/AuthenticatedRoute';
import LoginForm from "./components/LoginForm";
import StartPage from "./components/StartPage";

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/login" exact component={LoginForm} />
                    <AuthenticatedRoute path="/" exact component={StartPage} />
                </Switch>
            </Router>
        );
    }
}

export default App;
