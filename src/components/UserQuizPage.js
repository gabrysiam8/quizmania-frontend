import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap';
import API from '../utils/API';

class UserQuizPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quizzes: []
        };
        this.routeChange = this.routeChange.bind(this);
    }

    routeChange() {
        this.props.history.push("/quiz/add");
    }

    componentDidMount() {
        API.get('/quiz')
            .then(res => {
                this.setState({ quizzes: res.data });
                console.log(this.state.quizzes);
            })
            .catch(err => {
                console.log(err.response);
            });
    }

    render() {
        return (
            <div className="UserQuizPage">
                <div className="title">
                    <h1>YOUR QUIZZES</h1>
                </div>
                <div>
                    {this.state.quizzes.map(quiz =>
                        <Card className="myCard">
                            <Card.Img variant="top" src={process.env.PUBLIC_URL + '/questionMark.svg'} />
                            <Card.Body>
                                <Card.Title>{quiz.title}</Card.Title>
                                <Card.Subtitle>{quiz.description}</Card.Subtitle>
                            </Card.Body>
                        </Card>
                    )}
                </div>
                <Button className="myButton" variant="success" size="lg" onClick={this.routeChange}>Dodaj quiz</Button>
            </div>
        );
    }
}

export default UserQuizPage;