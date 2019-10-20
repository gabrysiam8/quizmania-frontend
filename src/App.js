import 'bootstrap/dist/css/bootstrap.min.css';
import React , {Component} from 'react';
import './App.css';
import { Switch } from 'react-router-dom';
import AuthService from './service/AuthService';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import AccountVerificationPage from './components/auth/AccountVerificationPage';
import AppliedRoute from './components/route/AppliedRoute';
import AuthenticatedRoute from './components/route/AuthenticatedRoute';
import StartPage from './components/common/StartPage';
import MainMenu from './components/common/MainMenu';
import ChangePasswordForm from './components/user/ChangePasswordForm';
import UserProfile from './components/user/UserProfile';
import UserQuizPage from './components/user/UserQuizPage';
import QuizForm from './components/quizAdd/QuizForm';
import QuizPlay from './components/quizPlay/QuizPlay';

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
                    <AppliedRoute path="/play/:id" exact component={QuizPlay} props={childProps}/>
                    <AppliedRoute path="/login" exact component={LoginForm} props={childProps}/>
                    <AppliedRoute path="/register" exact component={RegisterForm} props={childProps}/>
                    <AppliedRoute path="/confirmation" exact component={AccountVerificationPage}/>
                    <AuthenticatedRoute path="/user/me/password" exact component={ChangePasswordForm}/>
                    <AuthenticatedRoute path="/user/me" exact component={UserProfile}/>
                    <AuthenticatedRoute path="/quiz" exact component={UserQuizPage}/>
                    <AuthenticatedRoute path="/quiz/add" exact component={QuizForm}/>
                </Switch>
            </div>
        );
    }
}

export default App;
