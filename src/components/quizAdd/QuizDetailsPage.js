import React, { Component } from 'react';
import qs from 'qs';
import API from '../../utils/API';
import QuizAddEditComponent from './QuizAddEditComponent';
import { Spinner } from 'react-bootstrap';

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
            allLevels: [],
            editMode: (query.edit === "true"),
            loading: false
        };

        this.saveQuestion = this.saveQuestion.bind(this);
        this.updateQuiz = this.updateQuiz.bind(this);
        this.saveQuiz = this.saveQuiz.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async saveQuestion(question) {
        return API
            .post("/question", question)
            .then(res => {
                return res.data.id;
            });
    }

    async updateQuiz(history, quiz) {
        return API
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

    async saveQuiz(history, quiz) {
        return API
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

    async handleSubmit(questions, quiz) {
        const apiPromises = questions.filter(question => !question.id).map(question => this.saveQuestion(question));
        Promise
            .all(apiPromises)
            .then((newIds) => {
                const { history } = this.props;
                quiz.questionIds = [...quiz.questionIds, ...newIds];

                if(this.state.editMode) {
                    this.updateQuiz(history, quiz);
                }
                else {
                    this.saveQuiz(history, quiz);
                }
            });
    }

    async getQuizById(id) {
        return API
            .get("/quiz/"+id)
            .then(res => {
                this.setState({ quiz: res.data });
            });
    }

    async getQuizQuestions(id) {
        return API
            .get("/quiz/"+id+"/question?toScore=false")
            .then(res => {
                this.setState({ questions: res.data });
            });
    }

    async getQuizLevels() {
        return API
            .get("/quiz/level")
            .then(res => {
                this.setState({ allLevels: res.data });
            });
    }

    componentDidMount() {
        this.setState({ loading: true }, () => {
            if(this.state.editMode) {
                Promise
                    .all([this.getQuizById(this.state.quiz.id), this.getQuizQuestions(this.state.quiz.id), this.getQuizLevels()])
                    .then(() =>
                        this.setState({ loading: false })
                    );
            }
            else {
                this.getQuizLevels()
                    .then(() =>
                        this.setState({ 
                            loading: false,
                            quiz: {
                                ...this.state.quiz,
                                level: this.state.allLevels[0]
                            }
                        })
                    );
            }
        });
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
                        allLevels={this.state.allLevels}
                        handleSubmit={this.handleSubmit}
                    />
                }
            </div>
        )
    }
}

export default QuizDetailsPage;