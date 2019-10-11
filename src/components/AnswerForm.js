import React, { Component } from 'react'
import {Form, Row, Col } from 'react-bootstrap';


export class AnswerForm extends Component {
    
    render() {
        return (
            <Form.Group as={Row}>
                <Col sm={0}>
                    <Form.Check
                        type="radio"
                        name="formHorizontalRadios"
                        onChange={(e) => this.props.handleRadioChange(e,this.props.id)}
                        defaultChecked={this.props.id===0}
                    />
                </Col>
                <Col>
                    <Form.Control required type="text" name={"answer"+this.props.id} onChange={(e) => this.props.handleAnswerChange(e,this.props.id)}/>
                </Col>
            </Form.Group>
        )
    }
}

export default AnswerForm;