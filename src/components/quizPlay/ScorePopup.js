import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { withRouter } from 'react-router-dom'

export class ScorePopup extends Component {

    handleShowAnswers(event) {
        const { history } = this.props;
        history.push('/score/'+this.props.score.id)
    }

    render() {
        const { score } = this.props;
        return (
            <div>
                <Modal.Header closeButton>
                    <Modal.Title>Your score</Modal.Title>
                </Modal.Header>
                    
                <Modal.Body className="scorePopup">
                    <h1>Points</h1>
                    <h2>{score.goodAnswers}/{score.allAnswers} ({score.percentageScore} %)</h2>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="dark" onClick={this.handleShowAnswers.bind(this)}>Show correct answers</Button>
                </Modal.Footer>
            </div>
        )
    }
}

export default withRouter(ScorePopup);
