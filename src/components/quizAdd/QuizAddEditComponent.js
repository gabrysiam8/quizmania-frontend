import React, { Component } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import API from '../../utils/API';
import QuestionPopup from './QuestionPopup';
import QuestionList from './QuestionList';
import QuizForm from './QuizForm';

export class QuizAddEditComponent extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            quiz: props.quiz,
            questions: props.questions,
            showModal: false,
            showAlert: false,
            showConfirmation: false,
            validated: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleQuestionAdd = this.handleQuestionAdd.bind(this);
        this.handleQuestionDelete = this.handleQuestionDelete.bind(this);
        this.handleQuestionEdit = this.handleQuestionEdit.bind(this);
        this.showEditPopup = this.showEditPopup.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState(prevState => ({
            quiz: {
                ...prevState.quiz,
                [name]: value
            }
        }));
    }

    handleQuestionAdd(event, question) {
        this.setState({
            questions: [...this.state.questions, question],
            showModal: !this.state.showModal
        });
    }

    showEditPopup(event, question, idx) {
        this.setState({
            showModal: !this.state.showModal,
            editedQuestion: {
                question: question,
                arrIndex: idx
            }
        });
    }

    togglePopup() {
        this.setState({
          showModal: !this.state.showModal,
          editedQuestion: {}
        });
    }

    handleQuestionEdit(event, question, idx) {
        let updatedQuestions = [...this.state.questions];
        updatedQuestions[idx] = question;

        question.id ? 
            API
                .put("/question/"+question.id, question)
                .then(res => {
                    this.setState({
                        questions: updatedQuestions,
                        showModal: !this.state.showModal,
                        editedQuestion: {}
                    })
                })
            :
            this.setState({
                questions: updatedQuestions,
                showModal: !this.state.showModal,
                editedQuestion: {}
            });
            
    }

    handleQuestionDelete(event, question) {
        this.setState({
            quiz: {
                ...this.state.quiz,
                questionIds: this.state.quiz.questionIds.filter(id => id !== question.id)
            },
            questions: this.state.questions.filter( q => q !== question )
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.refs.btn.setAttribute("disabled", "disabled");
        const form = event.currentTarget;
        
        if (form.checkValidity() === false || this.state.questions.length<1) {
            event.stopPropagation();
            this.setState({ showAlert: true });
            this.refs.btn.removeAttribute("disabled");
        } else {
            this.props.handleSubmit(this.state.questions, this.state.quiz);
        }
        this.setState({
            validated: true
        });
    }
    
    render() {
        return (
            <div className="QuizAddEditComponent">
                <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                    <QuizForm initialState={this.state.quiz} allLevels={this.props.allLevels} handleChange={this.handleChange}/>
            
                    <p>Questions:</p>
                    <QuestionList 
                        questions={this.state.questions} 
                        showEditPopup={this.showEditPopup} 
                        handleQuestionDelete={this.handleQuestionDelete}
                    />

                    <Button variant="secondary" onClick={this.togglePopup}>
                        Add question
                    </Button>
                    <br/><br/>

                    <Button ref="btn" variant="info" type="submit">
                        {this.props.editMode ? "Update" : "Add"}
                    </Button>
                </Form>

                {this.state.showAlert ?
                    <Alert className="dangerAlert" variant="danger">
                        <p>Quiz must have title, category and at least one question!</p>
                    </Alert>
                    : null
                }

                <Modal size="lg" show={this.state.showModal} onHide={this.togglePopup}>
                    <QuestionPopup
                        initialState={this.state.editedQuestion} 
                        handleQuestionAdd={this.handleQuestionAdd}
                        handleQuestionEdit={this.handleQuestionEdit}
                    />
                </Modal>
            </div>
        )
    }
}

export default QuizAddEditComponent;
