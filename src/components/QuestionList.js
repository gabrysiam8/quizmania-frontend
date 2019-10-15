import React, { Component } from 'react'
import { Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export class QuestionList extends Component {
    render() {
        return (
            <div>
                {this.props.questions.map(question =>
                    <Card className="questionCard">
                        <Card.Body>
                            <div>
                                {question.question}
                                <Button className="deleteQuestionButton" variant="danger" onClick={(e) => this.props.handleQuestionDelete(e, question)}>
                                    <FontAwesomeIcon icon={faTimes} color="white"/>
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                )}
            </div>
        )
    }
}

export default QuestionList;