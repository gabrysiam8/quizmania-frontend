import React, { Component } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import AnswerForm from './AnswersForm';


export class QuestionPopup extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            question: "",
            answers: [],
            answerCount: 2,
            correctAnswer: 0,
            answersSaved: false,
            validated: false
        };
    
        this.handleQuestionChange = this.handleQuestionChange.bind(this);
        this.handleAnswerChange = this.handleAnswerChange.bind(this);
        this.handleAnswerSelect = this.handleAnswerSelect.bind(this);
        this.handleNext = this.handleNext.bind(this);
    }

    handleQuestionChange(event) {
        this.setState({ question: event.target.value });
    }
    
    handleAnswerChange(event, id) {
        const target = event.target;
        const value = target.value;
        
        const newAnswers = this.state.answers.slice();
        newAnswers[id] = value;
        this.setState({ answers: newAnswers });
    }

    handleAnswerSelect(event) {
        this.setState({ correctAnswer: event.target.value });
    }

    handleNext(event) {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.stopPropagation();
        } else {
            this.setState({ answersSaved: true });
        }
        this.setState({
            validated: true
        });
    }

    handleAddAnswer(event) {
        this.setState({ answerCount: this.state.answerCount+1 });
    }

    render() {
        return (
            <div>
                {this.state.answersSaved ?
                    <div>
                        <Modal.Header closeButton>
                            <Modal.Title>Select correct answer</Modal.Title>
                        </Modal.Header>

                        <Modal.Body className="questionModal">
                            <div><h5>{this.state.question}</h5></div>
                            {this.state.answers.map((answer,id) => 
                                <div>
                                    <input type="radio" name="answer" id={'answer'+id} value={answer} onChange={this.handleAnswerSelect}/>
                                    <label className="answerLabel" htmlFor={'answer'+id}>{answer}</label>
                                </div>
                            )}
                        </Modal.Body>

                        <Modal.Footer>
                            <Button 
                                variant="primary" 
                                type="button" 
                                onClick={(e) => this.props.handleQuestionAdd(e, 
                                    {
                                        question: this.state.question, 
                                        answers:this.state.answers, 
                                        correctAnswer:this.state.correctAnswer
                                    })
                                }>
                                Save
                            </Button>
                        </Modal.Footer>
                    </div>
                    :
                    <div>
                        <Modal.Header closeButton>
                            <Modal.Title>Add question</Modal.Title>
                        </Modal.Header>
                        <Form noValidate validated={this.state.validated} onSubmit={this.handleNext}>
                            <Modal.Body>
                                <Form.Group as={Row} controlId="question">
                                    <Form.Label column sm={2}>Question</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control required type="text" name="question" placeholder="Question" onChange={this.handleQuestionChange} />
                                    </Col>
                                </Form.Group>

                                <AnswerForm answerCount={this.state.answerCount} handleAnswerChange={this.handleAnswerChange}/>

                                <Button variant="secondary" disabled={this.state.answerCount===4} onClick={this.handleAddAnswer.bind(this)}>Add answer</Button>
                            </Modal.Body>
                        
                            <Modal.Footer>
                                <Button variant="secondary" type="submit">Next</Button>
                            </Modal.Footer>
                        </Form>
                    </div>
                }
            </div>
        )
    }
}

export default QuestionPopup;
