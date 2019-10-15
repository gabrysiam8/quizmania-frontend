import React, { Component } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import AnswerForm from './AnswerForm';


export class QuestionPopup extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            question: "",
            answers: Array(4).fill(""),
            correctAnswer: 0
        };
    
        this.handleQuestionChange = this.handleQuestionChange.bind(this);
        this.handleAnswerChange = this.handleAnswerChange.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
    }

    handleQuestionChange(event) {
        this.setState({ question: event.target.value });
    }

    handleRadioChange(event, id) {
        this.setState({ correctAnswer: id });
    }
    
    handleAnswerChange(event, id) {
        const target = event.target;
        const value = target.value;

        const newAnswers = this.state.answers.map((answer, aid) => {
            if (id !== aid) return answer;
            return value;
        });
      
        this.setState({ answers: newAnswers });

    }

    render() {
        return (
            <div>
                <Modal.Header closeButton>
                    <Modal.Title>Add question</Modal.Title>
                </Modal.Header>
                
                <Form onSubmit={(e) => this.props.handleQuestionAdd(e, this.state)}>
                    <Modal.Body>
                        <Form.Group as={Row} controlId="question">
                            <Form.Label column sm={2}>Question</Form.Label>
                            <Col sm={10}>
                                <Form.Control required type="text" name="question" placeholder="Question" onChange={this.handleQuestionChange} />
                            </Col>
                        </Form.Group>

                        <fieldset>
                            <Form.Group as={Row}>
                                <Form.Label as="legend" column sm={2}>Answers</Form.Label>
                                <Col sm={10}>
                                    {Array.from(Array(4).keys()).map((idx) => 
                                        <AnswerForm id={idx} handleRadioChange={this.handleRadioChange} handleAnswerChange={this.handleAnswerChange}/>
                                    )}
                                </Col>
                            </Form.Group>
                        </fieldset>
                    </Modal.Body>
                
                    <Modal.Footer>
                        <Button variant="primary" type="submit">Save</Button>
                    </Modal.Footer>
                </Form>
            </div>
        )
    }
}

export default QuestionPopup;
