import React, { Component } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import API from '../utils/API';
import QuestionPopup from './QuestionPopup';
import QuestionList from './QuestionList';

class QuizForm extends Component {
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
            showAlert: false
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
            this.setState({ showAlert: true});
        } else {
            for (const question of this.state.questions) {
                await this.saveQuestion(question);
            }

            const { history } = this.props;
            const { title, category, description, level, isPublic, questionIds } = this.state

            API
                .post("/quiz", { title, category, description, level, isPublic, questionIds })
                .then(res => {
                    alert("Quiz added");
                    history.push('/quiz');
                })
                .catch(err => {
                    console.log(err.response);
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
            <div className="QuizForm">
                <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control required type="text" name="title" placeholder="Enter quiz title" onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control required type="text" name="category" placeholder="Enter quiz category" onChange={this.handleChange}/>
                    </Form.Group>
            
                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="textarea" name="description" placeholder="Enter quiz description" onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="level">
                        <Form.Label>Level</Form.Label>
                        <Form.Control as="select" name="level" onChange={this.handleChange}>
                            {this.state.allLevels.map(level =>
                                <option>{level}</option>
                            )}
                        </Form.Control>
                    </Form.Group>
                    
                    <Form.Group controlId="isPublic">
                        <Form.Check name="isPublic" type="checkbox" id="default-checkbox" label="Public" onChange={this.handleChange}/>
                    </Form.Group>

                    <p>Questions:</p>
                    <QuestionList questions={this.state.questions} handleQuestionDelete={this.handleQuestionDelete}/>

                    <Button variant="secondary" onClick={this.togglePopup}>
                        Add question
                    </Button>
                    <br/><br/>

                    <Button variant="primary" type="submit">
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
            </div>
        );
    }
}

export default QuizForm;