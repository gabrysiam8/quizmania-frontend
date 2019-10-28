import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

export class StatisticCard extends Component {
    render() {
        return (
            <Card className="statisticCard">
                <h4>{this.props.title}</h4>
                <h1>{this.props.value}</h1>
            </Card>
        )
    }
}

export default StatisticCard;
