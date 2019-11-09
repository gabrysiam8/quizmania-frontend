import React, { Component } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import API from '../../utils/API';

export class QuizForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allLevels: [],
            loading: true
        };
    }

    componentDidMount() {
        this.setState({ loading: true }, () => {
            API
                .get("/quiz/level")
                .then(res => {
                    this.setState({ 
                        allLevels: res.data, 
                        loading: false 
                    });
                })
                .catch(err => {
                    this.setState({ loading: false });
                    console.log(err.response);
                });
        });
    }

    render() {
        var quiz = this.props.initialState;
        return (
            <div >
            {this.state.loading ?
                <Spinner animation="border" variant="info" />
                :
                <div className="QuizForm">
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control 
                            required 
                            type="text" 
                            name="title" 
                            value={quiz.title} 
                            placeholder="Enter quiz title" 
                            onChange={this.props.handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control 
                            required 
                            type="text" 
                            name="category" 
                            value={quiz.category} 
                            placeholder="Enter quiz category" 
                            onChange={this.props.handleChange}
                        />
                    </Form.Group>
                
                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control 
                            type="textarea" 
                            name="description" 
                            value={quiz.description}
                            placeholder="Enter quiz description" 
                            onChange={this.props.handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="level">
                        <Form.Label>Level</Form.Label>
                        <Form.Control 
                            as="select" 
                            name="level" 
                            value={quiz.level}
                            onChange={this.props.handleChange}
                        >
                            {this.state.allLevels.map(level =>
                                <option key={level}>{level}</option>
                            )}
                        </Form.Control>
                    </Form.Group>
                        
                    <Form.Group controlId="isPublic">
                        <Form.Check 
                            custom 
                            name="isPublic" 
                            checked={quiz.isPublic}
                            type="checkbox" 
                            id="default-checkbox" 
                            label="Public" 
                            onChange={this.props.handleChange}
                        />
                    </Form.Group>
                </div>
            }
            </div>
        )
    }
}

export default QuizForm;
