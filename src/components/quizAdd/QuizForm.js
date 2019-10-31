import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

export class QuizForm extends Component {
    render() {
        return (
            <div className="QuizForm">
                <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control required type="text" name="title" placeholder="Enter quiz title" onChange={this.props.handleChange}/>
                </Form.Group>

                <Form.Group controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control required type="text" name="category" placeholder="Enter quiz category" onChange={this.props.handleChange}/>
                </Form.Group>
            
                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="textarea" name="description" placeholder="Enter quiz description" onChange={this.props.handleChange}/>
                </Form.Group>

                <Form.Group controlId="level">
                    <Form.Label>Level</Form.Label>
                    <Form.Control as="select" name="level" onChange={this.props.handleChange}>
                        {this.props.levels.map(level =>
                            <option>{level}</option>
                        )}
                    </Form.Control>
                </Form.Group>
                    
                <Form.Group controlId="isPublic">
                    <Form.Check name="isPublic" type="checkbox" id="default-checkbox" label="Public" onChange={this.props.handleChange}/>
                </Form.Group>
            </div>
        )
    }
}

export default QuizForm;
