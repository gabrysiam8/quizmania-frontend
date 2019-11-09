import React, { Component } from 'react'
import { Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';

export class QuestionList extends Component {
    render() {
        return (
            <div className="questionCardsWrapper">
                {this.props.questions.map((question, id) =>
                    <Card key={question.question} className="questionCard">
                        <Card.Body>
                            <div >
                                {question.question}
                                <div className="buttonsWrapper">
                                    <Button className="questionButton" variant="info" onClick={(e) => this.props.showEditPopup(e, question, id)}>
                                        <FontAwesomeIcon icon={faEdit} color="white"/>
                                    </Button>
                                    <Button className="questionButton" variant="danger" onClick={(e) => this.props.handleQuestionDelete(e, question)}>
                                        <FontAwesomeIcon icon={faTimes} color="white"/>
                                    </Button>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                )}
            </div>
        )
    }
}

export default QuestionList;