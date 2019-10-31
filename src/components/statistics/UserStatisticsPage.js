import React, { Component } from 'react';
import qs from 'qs';
import StatisticsTab from './StatisticsTab';
import { Tab, Nav } from 'react-bootstrap';

export class UserStatisticsPage extends Component {
    
    render() {
        const query = qs.parse(this.props.location.search, {
            ignoreQueryPrefix: true
        });
        return (
            <div className="StatisticsPage">
                <div className="pageTitle">
                    <h1>Quiz statistics</h1>
                </div>
                <Tab.Container defaultActiveKey="my">
                    <Nav variant="pills" className="flex-row">
                        <Nav.Item>
                        <Nav.Link eventKey="my">My</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link eventKey="global">Global</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Tab.Content>
                        <Tab.Pane eventKey="my">
                            <StatisticsTab global={false} quizId={query.quizId}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="global">
                            <StatisticsTab global={true} quizId={query.quizId}/>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </div>
        )
    }
}

export default UserStatisticsPage;
