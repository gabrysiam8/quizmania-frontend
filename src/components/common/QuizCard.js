import React, { Component } from 'react'
import { Card, Button} from 'react-bootstrap';
import { withRouter } from 'react-router-dom'

export class QuizCard extends Component {
    constructor(props) {
        super(props);

        this.routeChange = this.routeChange.bind(this);
    }
    
    routeChange() {
        this.props.history.push("/play/"+this.props.quiz.id);
    }

    render() {
        return (
            <div className="quizCardWrapper">
            <Card className="quizCard">
                <Card.Img variant="top" src={process.env.PUBLIC_URL + '/images/questionMark.svg'} />
                <Card.Body>
                    <Card.Title>{this.props.quiz.title}</Card.Title>
                    <p>{this.props.quiz.description}</p>
                </Card.Body>
                {this.props.editable ?
                    <div className="buttonsWrapper">
                        <Button variant="info" onClick={(e) => this.props.onUpdate(e, this.props.quiz.id)}>Edit</Button> 
                        <Button className="quizButton" variant="danger" onClick={(e) => this.props.onDelete(e, this.props.quiz.id)}>Delete</Button> 
                    </div>
                    :
                    <Button variant="success" onClick={this.routeChange}>Play</Button> 
                }
            </Card>
            </div>
        )
    }
}

export default withRouter(QuizCard);
