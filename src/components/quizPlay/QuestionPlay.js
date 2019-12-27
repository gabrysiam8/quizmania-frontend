import React, { Component } from 'react';
import API from '../../utils/API';
import { Form, Row, Col, Button, Spinner } from 'react-bootstrap';

export class QuestionPlay extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            question: "",
            answers: [],
            selectedAnswer: "",
            loading: true
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
                    answers: res.data.answers,
                    selectedAnswer: "",
                    loading: false
                });
            })
            .catch(err => {
                this.setState({ loading: false });
            });
    }

    componentDidUpdate(prevProps) {
        if(prevProps.questionId !== this.props.questionId)
            this.loadQuestion();
    }

    componentDidMount() {
        this.setState({ loading: true }, () => {
            this.loadQuestion();
        });
    }

    render() {
        return (
            <div className="QuestionPlay">
                {this.state.loading ?
                    <Spinner animation="border" variant="info" />
                :
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
                        onClick={(e) => { this.props.handleNext(e, this.state.selectedAnswer); }}
                        disabled={this.state.selectedAnswer===""}
                    >
                        Next
                    </Button>
                </div>
                }
            </div>
        )
    }
}

export default QuestionPlay;