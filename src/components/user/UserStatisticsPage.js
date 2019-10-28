import React, { Component } from 'react';
import qs from 'qs';
import API from '../../utils/API';
import StatisticCard from './StatisticCard';
import prettyMilliseconds from 'pretty-ms';
import { Spinner } from 'react-bootstrap';

export class UserStatisticsPage extends Component {
    constructor(props) {
        super(props);

        const query = qs.parse(props.location.search, {
            ignoreQueryPrefix: true
        });
        this.state = {
            loading: true,
            scoreId: query.scoreId,
            quizId: query.quizId,
            globalStatistics: {}
        };
    }

    componentDidMount() {
        this.setState({ loading: true }, () => {
            API
                .get("/statistics?quizId="+this.state.quizId)
                .then(res => {
                    console.log(res.data)
                    this.setState({
                        loading: false,
                        globalStatistics: res.data
                    });
                })
                .catch(err => {
                    this.setState({ loading: false });
                });
        });
    }

    render() {
        const stats = this.state.globalStatistics;
        return (
            <div className="StatisticsPage">
                <div className="pageTitle">
                    <h1>Global quiz statistics</h1>
                </div>
                {this.state.loading ?
                    <Spinner animation="border" variant="info" />
                    :
                    <div className="statisticsCardsWrapper">
                        <StatisticCard title="Number of attempts" value={stats.attemptsNumber}/>
                        <StatisticCard title="Average score" value={stats.averageScore + " %"}/>
                        <StatisticCard title="Best score" value={stats.bestScore + " %"}/>
                        <StatisticCard title="Worst score" value={stats.worstScore + " %"}/>
                        <StatisticCard title="Average time" value={prettyMilliseconds(stats.averageTimeInMs)}/>
                    </div>
                }
            </div>
        )
    }
}

export default UserStatisticsPage;
