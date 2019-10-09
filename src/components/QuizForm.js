import React, { Component } from "react";
import { Button } from "react-bootstrap";
import API from "../utils/API";

class QuizForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            category: "",
            level: "",
            isPublic: true,
            questionIds: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const { title, category, level, isPublic, questionIds} = this.state;
        const { history } = this.props;

        API
            .post("/quiz")
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err.response);
            });
    }

    render() {
        return (
            <div className="QuizForm">
                <form onSubmit={this.handleSubmit}>
                    <p>Title</p>
                    <input type="text" name="title" value={this.state.title} onChange={this.handleChange} required/> <br/>
                    <p>Category</p>
                    <input type="text" name="category" value={this.state.category} onChange={this.handleChange} required/> <br/>
                    <p>Description</p>
                    <input type="text" name="description" value={this.state.description} onChange={this.handleChange}/> <br/>
                    <p>Level</p>
                    <input type="text" name="level" value={this.state.level} onChange={this.handleChange} required/> <br/>
                    <p>Public</p>
                    <input type="checkbox" name="isPublic" checked={this.state.isPublic} onChange={this.handleChange} required/> <br/>
                    <Button variant="success" size="sm">Add question</Button><br/><br/>
                    <input type="submit" value="Add"/>
                </form>
            </div>
        );
    }
}

export default QuizForm;