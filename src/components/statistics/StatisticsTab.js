import React, { Component, Fragment } from 'react';
import API from '../../utils/API';
import StatisticCard from './StatisticCard';
import { Spinner } from 'react-bootstrap';
import ScoreBarChart from './ScoreBarChart';
import ScoreLineChart from './ScoreLineChart';
import moment from 'moment';

export class StatisticsTab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            statistics: {}
        };
    }

    componentDidMount() {
        this.setState({ loading: true }, () => {
            API
                .get("/statistics?quizId="+this.props.quizId+"&global="+this.props.global)
                .then(res => {
                    this.setState({
                        loading: false,
                        statistics: res.data
                    });
                })
                .catch(err => {
                    this.setState({ loading: false });
                });
        });
    }

    render() {
        const stats = this.state.statistics;
        return (
            <div>
                {this.state.loading ?
                    <Spinner animation="border" variant="info" />
                    :
                    <Fragment>
                        <div className="statisticsCardsWrapper">
                            <StatisticCard title="Number of attempts" value={stats.attemptsNumber}/>
                            <StatisticCard title="Average score" value={stats.averageScore + " %"}/>
                            <StatisticCard title="Best score" value={stats.bestScore + " %"}/>
                            <StatisticCard title="Worst score" value={stats.worstScore + " %"}/>
                            <StatisticCard title="Average time" value={moment.duration(stats.averageTimeInMs).asSeconds().toFixed(3)+ ' s'}/>
                        </div>
                        <div className="chartsWrapper">
                            <ScoreBarChart data={stats.scoreDtoList}/>
                            <ScoreLineChart data={stats.scoreDtoList}/>
                        </div>
                    </Fragment>
                }
            </div>
        )
    }
}

export default StatisticsTab
