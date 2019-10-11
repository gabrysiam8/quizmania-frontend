import React , {Component} from 'react';
import { Card } from 'react-bootstrap';
import API from '../utils/API';

class StartPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            quizzes: []
        };
    }

    componentDidMount() {
        API.get('/quiz/all')
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
            <div className="StartPage">
                <div className="title">
                    <h1>DISCOVER QUIZZES</h1>
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
            </div>
        );
    }
}

export default StartPage;