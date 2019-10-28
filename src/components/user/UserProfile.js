import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import API from '../../utils/API';

class UserProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            username: ""
        };
    }

    componentDidMount() {
        API.get("/user/me")
            .then((res) => {
                this.setState({
                    email: res.data.email,
                    username: res.data.username
                });
            })
            .catch(err => {
                console.log(err.response);
            });
    }

    render() {
        return (
            <div className="UserProfile">
                <Card className="userCard">
                    <Card.Img variant="top" src={process.env.PUBLIC_URL + '/unknownUser.svg'} />
                    <Card.Body>
                        <Card.Title>{this.state.username}</Card.Title>
                        <Card.Subtitle>{this.state.email}</Card.Subtitle>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default UserProfile;