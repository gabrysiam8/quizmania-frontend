import React, { Component } from 'react';
import { Alert, Button } from 'react-bootstrap';
import API from '../../utils/API';
import QuizCard from '../common/QuizCard';
import SweetAlert from 'react-bootstrap-sweetalert';

class UserQuizPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quizzes: [],
            alert: null
        };

        this.routeChange = this.routeChange.bind(this);
        this.handleQuizUpdate = this.handleQuizUpdate.bind(this);
        this.handleQuizDelete = this.handleQuizDelete.bind(this);
    }

    routeChange() {
        this.props.history.push("/quiz/details?edit=false");
    }

    handleQuizUpdate(event, id) {
        this.props.history.push("/quiz/details?edit=true&quizId="+id);
    }

    handleQuizDelete(event, id) {
        API.delete('/quiz/'+id)
            .then(res => {
                const updatedQuizzes = this.state.quizzes.filter((quiz) => {
                    return quiz.id !== id;
                });

                const successAlert = <SweetAlert 
                                        success 
                                        title="Quiz deleted!" 
                                        confirmBtnText="Ok" 
                                        confirmBtnBsStyle="info"
                                        onConfirm={() => this.setState({ alert: null })}
                                    />
              
                this.setState({ quizzes: updatedQuizzes, alert: successAlert });
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
        const { history, location } = this.props;
        var alert = null;
        if(location.state) {
            const alertVariant = location.state.quizAdded ? "success" : "danger";
            alert = <Alert variant={alertVariant} onClose={() => history.replace({ pathname: "/quiz", state: "" })} dismissible>
                        {location.state.message}
                    </Alert>
        }
        
        return (
            <div className="UserQuizPage">
                <div className="pageTitle">
                    <h1>Your quizzes</h1>
                </div>
                <div>
                    {alert}
                </div>
                <div className="quizTable">
                    {this.state.quizzes.map(quiz =>
                        <QuizCard 
                            key={quiz.id}
                            quiz={quiz} 
                            editable={true}
                            onUpdate={this.handleQuizUpdate}
                            onDelete={this.handleQuizDelete}
                        />
                    )}
                </div>
                <Button 
                    className="addQuizButton" 
                    variant="success"
                    size="lg"
                    onClick={this.routeChange}
                >
                    Add quiz
                </Button>
                {this.state.alert}
            </div>
        );
    }
}

export default UserQuizPage;