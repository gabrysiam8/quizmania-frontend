import React, { Component } from 'react';
import API from '../../utils/API';
import { Form, Row, Col, Button } from 'react-bootstrap';

export class QuestionPlay extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            question: "",
            answers: [],
            selectedAnswer: ""
        };
        this.handleAnswerChange = this.handleAnswerChange.bind(this);
    }

    handleAnswerChange(event) {
        this.setState({ selectedAnswer: event.target.value });
        this.refs.btn.removeAttribute("disabled");
    }

    loadQuestion() {
        API.get('/question/'+this.props.questionId)
            .then(res => {
                this.setState({
                    question: res.data.question, 
                    answers:res.data.answers
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
        return (
            <div className="QuestionPlay">
                <h1>{this.state.question}</h1>
                <fieldset>
                    <Form.Group as={Row}>
                        <Col >
                            {this.state.answers.map((answer, id) => 
                                <div key={answer}>
                                    <input 
                                        type="radio" 
                                        name={this.state.question}
                                        id={answer} 
                                        value={answer} 
                                        onChange={this.handleAnswerChange} 
                                        checked={this.state.selectedAnswer===answer}
                                    />
                                    <label className="answerLabel" htmlFor={answer}>{answer}</label>
                                </div>
                            )}
                    </Col>
                    </Form.Group>
                </fieldset>
                <Button 
                    ref="btn"
                    variant="outline-dark"
                    onClick={(e) => {
                        this.refs.btn.setAttribute("disabled", "disabled"); 
                        this.props.handleNext(e, this.state.selectedAnswer);
                    }}
                >
                    Next
                </Button>
            </div>
        )
    }
}

export default QuestionPlay;
