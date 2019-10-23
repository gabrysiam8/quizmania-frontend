import React, { Component } from 'react';
import API from '../../utils/API';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export class QuestionPlay extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            question: "",
            answers: [],
            selectedAnswer: props.userAnswer
        };
        this.handleAnswerChange = this.handleAnswerChange.bind(this);
    }

    handleAnswerChange(event) {
        this.setState({ selectedAnswer: event.target.value });
    }

    loadQuestion() {
        API.get('/question/'+this.props.questionId)
            .then(res => {
                this.setState({
                    question: res.data.question, 
                    answers:res.data.answers, 
                    selectedAnswer: this.props.play ? "": this.state.selectedAnswer 
                });
            })
            .catch(err => {
                console.log(err.response);
            });
    }

    componentDidUpdate(prevProps) {
        if(prevProps.questionId !== this.props.questionId)
            this.loadQuestion();
    }

    componentDidMount() {
        
        this.loadQuestion()
    }

    render() {
        console.log(this.state.selectedAnswer)
        return (
            <div className="QuestionPlay">
                <h1>{this.state.question}</h1>
                <fieldset>
                    <Form.Group as={Row}>
                        <Col >
                            {this.state.answers.map((answer, id) => 
                                <div>
                                    <input 
                                        type="radio" 
                                        name={this.state.question}
                                        id={answer} 
                                        value={answer} 
                                        onChange={this.handleAnswerChange} 
                                        checked={this.state.selectedAnswer===answer}
                                        disabled={!this.props.play}
                                    />
                                    <label className="answerLabel" htmlFor={answer}>{answer}</label>
                                </div>
                            )}
                    </Col>
                    </Form.Group>
                </fieldset>
                {this.props.play ?
                    <Button onClick={(e) => this.props.handleNext(e, this.state.selectedAnswer)}>Next</Button>
                    : null
                }
            </div>
        )
    }
}

export default QuestionPlay;
