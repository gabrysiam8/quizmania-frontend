import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { withRouter } from 'react-router-dom'

export class ScorePopup extends Component {

    handleShowAnswers(event) {
        const { history } = this.props;
        history.push('/score/'+this.props.score.id)
    }

    render() {
        return (
            <div>
                <Modal.Header closeButton>
                    <Modal.Title>Your score</Modal.Title>
                </Modal.Header>
                    
                <Modal.Body>
                    <h1>{this.props.score.percentageScore} %</h1>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={this.handleShowAnswers.bind(this)}>Show correct answers</Button>
                </Modal.Footer>
            </div>
        )
    }
}

export default withRouter(ScorePopup);
