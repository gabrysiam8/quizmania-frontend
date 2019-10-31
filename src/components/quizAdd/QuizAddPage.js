import React, { Component } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import API from '../../utils/API';
import QuestionPopup from './QuestionPopup';
import QuestionList from './QuestionList';
import QuizForm from './QuizForm';

class QuizAddPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            category: "",
            description: "",
            level: "",
            isPublic: false,
            questionIds: [],
            questions: [],
            allLevels: [],
            showModal: false,
            validated: false, 
            showAlert: false,
            showConfirmation: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleQuestionAdd = this.handleQuestionAdd.bind(this);
        this.handleQuestionDelete = this.handleQuestionDelete.bind(this);
        this.saveQuestion = this.saveQuestion.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleQuestionAdd(event, question) {
        event.preventDefault();
        
        this.setState({
            questions: [...this.state.questions, question],
            showModal: !this.state.showModal
        });
    }

    handleQuestionDelete(event, question) {
        event.preventDefault();
        
        this.setState({
            questions: this.state.questions.filter( q => q !== question )
        });
    }

    async saveQuestion(question) {
        return API
                .post("/question", question)
                .then(res => {
                    this.setState({questionIds: [...this.state.questionIds, res.data.id]})
                });
    }

    async handleSubmit(event) {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false || this.state.questions.length<1) {
            event.stopPropagation();
            this.setState({ showAlert: true });
        } else {
            const apiPromises = this.state.questions.map((question) => this.saveQuestion(question));
            Promise
                .all(apiPromises)
                .then(() => {
                    const { history } = this.props;
                    const { title, category, description, level, isPublic, questionIds } = this.state

                    API
                        .post("/quiz", { title, category, description, level, isPublic, questionIds })
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
                });
        }
        this.setState({
            validated: true
        });
    }

    togglePopup() {
        this.setState({
          showModal: !this.state.showModal
        });
    }

    componentDidMount() {
        API
            .get("/quiz/level")
            .then(res => {
                this.setState({ allLevels: res.data , level: res.data[0]});
            })
            .catch(err => {
                console.log(err.response);
            });
    }

    render() {
        return (
            <div className="QuizAddPage">
                <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                    <QuizForm levels={this.state.allLevels} handleChange={this.handleChange}/>
            
                    <p>Questions:</p>
                    <QuestionList questions={this.state.questions} handleQuestionDelete={this.handleQuestionDelete}/>

                    <Button variant="secondary" onClick={this.togglePopup}>
                        Add question
                    </Button>
                    <br/><br/>

                    <Button variant="info" type="submit">
                        Add
                    </Button>
                </Form>
                <Modal size="lg" show={this.state.showModal} onHide={this.togglePopup}>
                    <QuestionPopup handleQuestionAdd={this.handleQuestionAdd}/>
                </Modal>
                {this.state.showAlert ?
                    <Alert className="loginAlert" variant="danger">
                        <p>Quiz must have title, category and at least one question!</p>
                    </Alert>
                    : null
                }
                {this.state.showConfirmation ?
                    <Modal size="sm" show={this.state.showConfirmation}>
                        <Modal.Header closeButton></Modal.Header>
                        <Modal.Body>Quiz successfully added!</Modal.Body>
                    </Modal>
                    : null
                }
            </div>
        );
    }
}

export default QuizAddPage;