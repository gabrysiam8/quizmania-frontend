import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap';

export class QuizCard extends Component {
    render() {
        return (
            <Card className="myCard">
                <Card.Img variant="top" src={process.env.PUBLIC_URL + '/questionMark.svg'} />
                <Card.Body>
                    <Card.Title>{this.props.quiz.title}</Card.Title>
                    <Card.Subtitle>{this.props.quiz.description}</Card.Subtitle>
                </Card.Body>
                {this.props.editable ?
                    <Button variant="danger" onClick={(e) => this.props.onDelete(e, this.props.quiz.id)}>Delete</Button> 
                    : null}
            </Card>
        )
    }
}

export default QuizCard;
