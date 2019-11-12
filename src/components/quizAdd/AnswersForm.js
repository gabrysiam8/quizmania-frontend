import React, { Component } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

export class AnswerForm extends Component {
    constructor(props) {
        super(props);
    
        this.renderButtons = this.renderButtons.bind(this);
    }
    
    renderButtons(id) {
        var buttons=[];
        if(id===this.props.answerCount-1) {
            if(id>=0) {
                buttons.push(<Button key={"add"+id} className="addAnswerButton" variant="success" disabled={id===2} onClick={this.props.handleAnswerAdd}>
                                <FontAwesomeIcon icon={faPlus} color="white"/>
                            </Button>);
                buttons.push(<Button key={"del"+id} className="deleteAnswerButton" variant="danger" disabled={id===0} onClick={this.props.handleAnswerDelete}>
                                <FontAwesomeIcon icon={faTimes} color="white"/>
                            </Button>);
            }
        }
        return buttons;
    }

    render() {
        return (
            <fieldset>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>Answers</Form.Label>
                    <Col>
                        <Form.Control 
                            className="correctAnswerInput"
                            required 
                            type="text" 
                            name="correctAnswer"
                            value={this.props.correctAnswer}
                            placeholder="Correct answer" 
                            onChange={(e) => this.props.handleChange(e)}
                        />
                    </Col>
                    <Col sm={2} />
                </Form.Group>

                {this.props.badAnswers.map((answer, id) => 
                    <Form.Group as={Row}>
                        <Col sm={2} />
                        <Col>
                            <Form.Control 
                                required 
                                type="text" 
                                name={"answer"+id} 
                                value={answer} 
                                onChange={(e) => this.props.handleAnswerChange(e,id)}
                            />
                        </Col>
                        <Col sm={2}>
                            <div className="buttonsWrapper">{this.renderButtons(id)}</div>
                        </Col>
                    </Form.Group>
                )}
            </fieldset>
        )
    }
}

export default AnswerForm;