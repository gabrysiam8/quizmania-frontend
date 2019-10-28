import React, { Component } from 'react';
import { Col } from 'react-bootstrap';

export class QuestionScore extends Component {
    render() {
        const { question, userAnswer } = this.props;
        return (
            <div className="QuestionScore">
                <h3>{question.question}</h3>
                <fieldset>
                    <Col >
                        {question.answers.map((answer, id) => 
                            <div key={answer}>
                                {answer===question.correctAnswer ?
                                    <label className="answerLabel goodAnswerLabel">{answer}</label>
                                    :
                                    answer=== userAnswer ?
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
