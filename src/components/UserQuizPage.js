import React, { Component } from 'react';
import { Alert, Button } from 'react-bootstrap';
import API from '../utils/API';
import QuizCard from './QuizCard';

class UserQuizPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quizzes: [],
            showAlert: false
        };

        this.routeChange = this.routeChange.bind(this);
        this.handleQuizDelete = this.handleQuizDelete.bind(this);
    }

    routeChange() {
        this.props.history.push("/quiz/add");
    }

    handleQuizDelete(event, id) {
        API.delete('/quiz/'+id)
            .then(res => {
                const updatedQuizzes = this.state.quizzes.filter((quiz) => {
                    return quiz.id !== id;
                });
              
                this.setState({ quizzes: updatedQuizzes, showAlert: true });
            })
            .catch(err => {
                console.log(err.response);
            });
    }

    componentDidMount() {
        API.get('/quiz')
            .then(res => {
                this.setState({ quizzes: res.data});
            })
            .catch(err => {
                console.log(err.response);
            });
    }

    render() {
        return (
            <div className="UserQuizPage">
                <div className="pageTitle">
                    <h1>YOUR QUIZZES</h1>
                </div>
                <div>
                    {this.state.showAlert ?
                        <Alert variant="danger" onClose={() => this.setState({ showAlert: false })} dismissible>
                            Quiz deleted!
                        </Alert>
                        : null
                    }
                </div>
                <div className="quizTable">
                    {this.state.quizzes.map(quiz =>
                        <QuizCard 
                            quiz={quiz} 
                            editable={true}
                            onDelete = {this.handleQuizDelete}
                        />
                    )}
                </div>
                <Button 
                    className="addQuizButton" 
                    variant="success"
                    size="lg"
                    onClick={this.routeChange}
                >
                    Dodaj quiz
                </Button>
            </div>
        );
    }
}

export default UserQuizPage;