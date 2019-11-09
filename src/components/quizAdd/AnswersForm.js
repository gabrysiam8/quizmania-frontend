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
            if(id>0) {
                buttons.push(<Button key={"add"+id} className="addAnswerButton" variant="success" disabled={id===3} onClick={this.props.handleAnswerAdd}>
                                <FontAwesomeIcon icon={faPlus} color="white"/>
                            </Button>);
                if(id>1) {
                    buttons.push(<Button key={"del"+id} className="deleteAnswerButton" variant="danger" onClick={this.props.handleAnswerDelete}>
                                    <FontAwesomeIcon icon={faTimes} color="white"/>
                                </Button>);
                }
            }
        }
        return buttons;
    }

    render() {
        return (
            <fieldset>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>Answers</Form.Label>
                    <Col sm={10}>
                        {this.props.answers.map((answer, id) => 
                            <Form.Group key={id} as={Row}>
                                <Col>
                                    <Form.Control 
                                        required 
                                        type="text" 
                                        name={"answer"+id} 
                                        value={answer} 
                                        onChange={(e) => this.props.handleAnswerChange(e,id)}
                                    />
                                </Col>
                                <Col sm={3}>
                                    <div className="buttonsWrapper">{this.renderButtons(id)}</div>
                                </Col>
                            </Form.Group>
                        )}
                    </Col>
                </Form.Group>
            </fieldset>
        )
    }
}

export default AnswerForm;