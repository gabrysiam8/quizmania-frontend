import React, { Component } from 'react';
import API from '../../utils/API';
import qs from 'qs';
import {Alert} from 'react-bootstrap';

export class AccountVerificationPage extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            confirmed: false,
            message: ""
        };

    }

    componentDidMount() {
        const query = qs.parse(this.props.location.search, {
            ignoreQueryPrefix: true
        });
        if(query.token) {
            API.get('/auth/confirmation?token='+query.token)
            .then(res => {
                this.setState({
                    confirmed: true,
                    message: res.data
                });
            })
            .catch(err => {
                this.setState({
                    message: err.response.data
                });
            });
        }
    }

    render() {
        return (
            <div className="AccountConfirmationPage">
                {this.state.confirmed ?
                    <Alert variant="success">
                        <Alert.Heading>Account was successfully verified!</Alert.Heading>
                        <p>To log in to the application click <Alert.Link href="/login">here</Alert.Link>.</p>
                    </Alert>
                    :
                    <Alert variant="danger">
                        <Alert.Heading>Failed to verify e-mail address!</Alert.Heading>
                        <p>{this.state.message}</p>
                    </Alert>
                }
            </div>
        )
    }
}

export default AccountVerificationPage;
