import React, { Component } from 'react';
import qs from 'qs';
import API from '../../utils/API';
import QuizAddEditComponent from './QuizAddEditComponent';
import { Spinner, Alert } from 'react-bootstrap';

export class QuizDetailsPage extends Component {
    constructor(props) {
        super(props);

        const query = qs.parse(this.props.location.search, {
            ignoreQueryPrefix: true
        });

        this.state = {
            quiz: {
                id: query.quizId,
                title: "",
                category: "",
                description: "",
                level: "",
                isPublic: false,
                questionIds: []
            },
            questions: [],
            validated: false, 
            showAlert: false,
            editMode: (query.edit === "true"),
            loading: false
        };

        this.saveQuestion = this.saveQuestion.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async saveQuestion(question) {
        return API
                .post("/question", question)
                .then(res => {
                    return res.data.id;
                });
    }

    async handleSubmit(event, questions, quiz) {
        const form = event.currentTarget;
        if (form.checkValidity() === false || questions.length<1) {
            event.stopPropagation();
            this.setState({ showAlert: true });
        } else {
            const apiPromises = questions.filter(question => !question.id).map(question => this.saveQuestion(question));
            Promise
                .all(apiPromises)
                .then((newIds) => {
                    const { history } = this.props;
                    quiz.questionIds = [...quiz.questionIds, ...newIds];
                    if(this.state.editMode) {
                        API
                            .put("/quiz/"+quiz.id, quiz)
                            .then(res => {
                                history.push({
                                    pathname: '/quiz',
                                    state: { 
                                        quizAdded: true,
                                        message: "Quiz successfully updated!"
                                    }
                                });
                            })
                            .catch(err => {
                                history.push({
                                    pathname: '/quiz',
                                    state: { 
                                        quizAdded: false,
                                        message: "Failed to update quiz!"
                                    }
                                });
                            });
                    }
                    else {
                        API
                        .post("/quiz", quiz)
                        .then(res => {
                            history.push({
                                pathname: '/quiz',
                                state: { 
                                    quizAdded: true,
                                    message: "Quiz successfully added!"
                                }
                            });
                        })
                        .catch(err => {
                            history.push({
                                pathname: '/quiz',
                                state: { 
                                    quizAdded: false,
                                    message: "Failed to add quiz!"
                                }
                            });
                        });
                    }
                });
        }
        this.setState({
            validated: true
        });
    }

    async getQuizById(id) {
        return API
                .get("/quiz/"+id)
                .then(res => {
                    this.setState({ 
                        quiz: res.data
                    });
                })
                .catch(err => {
                    console.log(err.response);
                });
    }

    async getQuizQuestions(id) {
        return API
                .get("/quiz/"+id+"/question")
                .then(res => {
                    this.setState({ questions: res.data });
                })
                .catch(err => {
                    console.log(err.response);
        });
    }

    componentDidMount() {
        if(this.state.editMode) {
            this.setState({ loading: true }, () => {
                Promise
                    .all([this.getQuizById(this.state.quiz.id), this.getQuizQuestions(this.state.quiz.id)])
                    .then(() =>
                        this.setState({ loading: false })
                    );
            });
        }
    }

    render() {
        return (
            <div className="QuizDetailsPage">
                {this.state.loading ?
                    <Spinner animation="border" variant="info" />
                    :
                    <QuizAddEditComponent 
                        editMode={this.state.editMode}
                        quiz={this.state.quiz}
                        questions={this.state.questions}
                        handleSubmit={this.handleSubmit}
                        validated={this.state.validated}
                    />
                }
                {this.state.showAlert ?
                    <Alert className="loginAlert" variant="danger">
                        <p>Quiz must have title, category and at least one question!</p>
                    </Alert>
                    : null
                }
            </div>
        )
    }
}

export default QuizDetailsPage;