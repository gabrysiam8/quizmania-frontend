import React, { Component } from 'react'
import {Form, Row, Col } from 'react-bootstrap';


export class AnswerForm extends Component {
    
    render() {
        return (
            <fieldset>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>Answers</Form.Label>
                    <Col sm={10}>
                        {Array.from(Array(this.props.answerCount).keys()).map((idx) => 
                            <Form.Group as={Row}>
                                <Col>
                                    <Form.Control required type="text" name={"answer"+idx} onChange={(e) => this.props.handleAnswerChange(e,idx)}/>
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