import React, { Component } from 'react'
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import AnswerForm from './AnswersForm';


export class QuestionForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props.initialState,
            validated: false,
            showAlert: false
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleAnswerChange = this.handleAnswerChange.bind(this);
        this.handleAnswerDelete= this.handleAnswerDelete.bind(this);
        this.handleAnswerSelect = this.handleAnswerSelect.bind(this);
        this.handleAnswerAdd = this.handleAnswerAdd.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    
    handleAnswerChange(event, id) {
        const target = event.target;
        const value = target.value;
        
        const newAnswers = this.state.badAnswers.slice();
        newAnswers[id] = value;
        this.setState({ badAnswers: newAnswers });
    }

    handleAnswerDelete(event) {  
        const newAnswers = this.state.badAnswers.slice();
        newAnswers.pop();
        this.setState({ 
            badAnswers: newAnswers,
            answerCount: this.state.answerCount-1 
        });
    }

    handleAnswerSelect(event) {
        this.setState({ correctAnswer: event.target.value });
    }

    handleAnswerAdd(event) {
        const newAnswers = this.state.badAnswers.slice();
        newAnswers.push('');
        this.setState({ 
            badAnswers: newAnswers,
            answerCount: this.state.answerCount+1 
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const form = event.currentTarget;
        const { badAnswers, correctAnswer } = this.state;
        if (form.checkValidity() === false) {
          event.stopPropagation();
        } else if((new Set([...badAnswers,correctAnswer])).size !== badAnswers.length+1) {
            event.stopPropagation();
            this.setState({ showAlert: true });
        } else {
            this.props.editMode ? 
                this.props.handleQuestionEdit(event, 
                {
                    id: this.props.initialState.id,
                    question: this.state.question, 
                    badAnswers: badAnswers, 
                    correctAnswer: correctAnswer,
                }, this.props.initialState.arrIndex)
            :
                this.props.handleQuestionAdd(event, 
                {
                    question: this.state.question, 
                    badAnswers: badAnswers, 
                    correctAnswer: correctAnswer
                })
        }
        this.setState({ validated: true });
    }

    render() {
        return (
            <div>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.editMode ? "Edit question" : "Add question"}</Modal.Title>
                </Modal.Header>
                <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                    <Modal.Body>
                        <Form.Group as={Row} controlId="question">
                            <Form.Label column sm={2}>Question</Form.Label>
                            <Col>
                                <Form.Control 
                                    required 
                                    type="text" 
                                    name="question" 
                                    value={this.state.question}
                                    placeholder="Question" 
                                    onChange={this.handleChange} 
                                />
                            </Col>
                        </Form.Group>

                        <AnswerForm 
                            badAnswers={this.state.badAnswers}
                            correctAnswer={this.state.correctAnswer}
                            answerCount={this.state.answerCount} 
                            handleAnswerChange={this.handleAnswerChange}
                            handleChange={this.handleChange}
                            handleAnswerDelete={this.handleAnswerDelete}
                            handleAnswerAdd={this.handleAnswerAdd}
                        />

                        {this.state.showAlert ?
                            <Alert className="dangerAlert" variant="danger">
                                <p>Answers must be unique!</p>
                            </Alert>
                            : null
                        }
                    </Modal.Body>
                    
                    <Modal.Footer>
                        <Button 
                            variant="info" 
                            type="submit"
                            >
                            Save
                        </Button>
                    </Modal.Footer>
                </Form>
            </div>
        )
    }
}

export default QuestionForm;
