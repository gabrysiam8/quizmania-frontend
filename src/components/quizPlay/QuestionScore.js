import React, { Component } from 'react';
import API from '../../utils/API';
import { Col } from 'react-bootstrap';

export class QuestionScore extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            question: "",
            answers: [],
            correctAnswer: ""
        };
    }

    loadQuestion() {
        API.get('/question/'+this.props.questionId)
            .then(res => {
                this.setState({
                    question: res.data.question, 
                    answers: res.data.answers, 
                    correctAnswer: res.data.correctAnswer
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
            <div className="QuestionScore">
                <h3>{this.state.question}</h3>
                <fieldset>
                    <Col >
                        {this.state.answers.map((answer, id) => 
                            <div>
                                {answer===this.state.correctAnswer ?
                                    <label className="answerLabel goodAnswerLabel">{answer}</label>
                                    :
                                    answer=== this.props.userAnswer ?
                                        <label className="answerLabel badAnswerLabel">{answer}</label>
                                        :
                                        <label className="answerLabel">{answer}</label>
                                }
                            </div>
                            )}
                    </Col>
                </fieldset>
            </div>
        )
    }
}

export default QuestionScore;
