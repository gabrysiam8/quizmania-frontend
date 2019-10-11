import React, { Component } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import API from '../utils/API';
import QuestionPopup from './QuestionPopup';

class QuizForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            category: "",
            level: "",
            isPublic: false,
            questionIds: [],
            allLevels: [],
            showModal: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleQuestionSave = this.handleQuestionSave.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleQuestionSave(event, question) {
        event.preventDefault();
        API
            .post("/question", question)
            .then(res => {
                this.setState({
                    questionIds: [...this.state.questionIds, res.data.id],
                    showModal: !this.state.showModal
                });
            })
            .catch(err => {
                console.log(err.response);
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { history } = this.props;

        console.log(this.state);

        API
            .post("/quiz", this.state)
            .then(res => {
                alert("Quiz added");
                history.push('/quiz');
            })
            .catch(err => {
                console.log(err.response);
            });
    }

    togglePopup() {
        this.setState({
          showModal: !this.state.showModal
        });
      }

    componentDidMount() {
        API
            .get("/quiz/level")
            .then(res => {
                this.setState({ allLevels: res.data , level: res.data[0]});
            })
            .catch(err => {
                console.log(err.response);
            });
    }

    render() {
        return (
            <div className="QuizForm">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control required type="text" name="title" placeholder="Enter quiz title" onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control required type="text" name="category" placeholder="Enter quiz category" onChange={this.handleChange}/>
                    </Form.Group>
            
                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" name="description" placeholder="Enter quiz description" onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="level">
                        <Form.Label>Level</Form.Label>
                        <Form.Control as="select" name="level" onChange={this.handleChange}>
                            {this.state.allLevels.map(level =>
                                <option>{level}</option>
                            )}
                        </Form.Control>
                    </Form.Group>
                    
                    <Form.Group controlId="isPublic">
                        <Form.Check name="isPublic" type="checkbox" id="default-checkbox" label="Public" onChange={this.handleChange}/>
                    </Form.Group>

                    <Button variant="secondary" onClick={this.togglePopup}>
                        Add question
                    </Button>
                    <br/><br/>

                    <Button variant="primary" type="submit">
                        Add
                    </Button>
                </Form>
                <Modal show={this.state.showModal} onHide={this.togglePopup}>
                    <QuestionPopup handleQuestionSave={this.handleQuestionSave}/>
                </Modal>
            </div>
        );
    }
}

export default QuizForm;