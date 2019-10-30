import React, { Component } from 'react';
import qs from 'qs';
import StatisticsTab from './StatisticsTab';
import { Tabs, Tab } from 'react-bootstrap';

export class UserStatisticsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true
        };
    }

    render() {
        const query = qs.parse(this.props.location.search, {
            ignoreQueryPrefix: true
        });
        console.log(query);
        return (
            <div className="StatisticsPage">
                <div className="pageTitle">
                    <h1>Quiz statistics</h1>
                </div>
                <Tabs defaultActiveKey="my" id="uncontrolled-tab-example">
                    <Tab eventKey="my" title="My">
                        <StatisticsTab global={false} quizId={query.quizId}/>
                    </Tab>
                    <Tab eventKey="global" title="Global">
                        <StatisticsTab global={true} quizId={query.quizId}/>
                    </Tab>
                </Tabs>
            </div>
        )
    }
}

export default UserStatisticsPage;
