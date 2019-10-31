import React, { Component, Fragment } from 'react';
import { Card, Spinner, Button } from 'react-bootstrap';
import CountUp from 'react-countup';
import API from '../../utils/API';

class UserProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            user: {}
        };
        
        this.routeChange = this.routeChange.bind(this);
    }

    routeChange(path) {
        this.props.history.push(path);
    }

    componentDidMount() {
        this.setState({ loading: true }, () => {
            API.get("/user/me")
                .then((res) => {
                    this.setState({
                        loading: false,
                        user: res.data
                    });
                })
                .catch(err => {
                    this.setState({ loading: false });
                });
        });
    }

    render() {
        const { loading, user } = this.state;
        return (
            <div className="UserProfile">
                {loading ?
                    <Spinner animation="border" variant="info" />
                    :
                    <Fragment>
                        <Card className="userCard">
                            <Card.Img variant="top" src={process.env.PUBLIC_URL + '/unknownUser.svg'} />
                            <Card.Body>
                                <Card.Title>{user.username}</Card.Title>
                                <Card.Subtitle>{user.email}</Card.Subtitle>
                            </Card.Body>
                        </Card>
                        <div className="countersWrapper">
                            <div className="counter">
                                <h3>You added:</h3>
                                <CountUp end={user.quizAddedNumber} />
                                <h3>quizzes</h3>
                                <Button 
                                    variant="info" 
                                    onClick={() => this.routeChange("/quiz")}
                                >
                                    Show quizzes
                                </Button>
                            </div>
                            <div className="counter">
                                <h3>You solved:</h3>
                                <CountUp end={user.quizAttemptsNumber} />
                                <h3>quizzes</h3>
                                <Button 
                                    variant="info"
                                    onClick={() => this.routeChange("/result")}
                                >
                                    Show results
                                </Button>
                            </div>
                        </div>
                    </Fragment>
                }
            </div>
        );
    }
}

export default UserProfile;