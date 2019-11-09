import React, { Component } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
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
            showConfirmation: false
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
        event.preventDefault();
        
        this.setState({
            questions: [...this.state.questions, question],
            showModal: !this.state.showModal
        });
    }

    showEditPopup(event, question, idx) {
        event.preventDefault();
        
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
        event.preventDefault();
        
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
        this.props.handleSubmit(event, this.state.questions, this.state.quiz)
    }
    
    render() {
        return (
            <div className="QuizAddEditComponent">
                <Form noValidate validated={this.props.validated} onSubmit={this.handleSubmit}>
                    <QuizForm initialState={this.state.quiz} handleChange={this.handleChange}/>
            
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

                    <Button variant="info" type="submit">
                        {this.props.editMode ? "Update" : "Add"}
                    </Button>
                </Form>

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
