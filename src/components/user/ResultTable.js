import React, { Component } from 'react';
import moment from 'moment';
import { Table, Button, Spinner } from 'react-bootstrap';
import API from '../../utils/API';

export class ResultTable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            scores: [],
            quizIdTitle: []
        };
    }

    async getScores() {
        return API
                .get("/score")
                .then((res) => {
                    return this.groupBy('quizId', res.data);
                });
    }

    async getQuizResult(quizId, quizScores) {
        const attemptsNum = quizScores.length;
        const lastResult = quizScores.reduce((prev, current) => (moment(prev.startDate).isAfter(current.startDate)) ? prev : current);
        let newScore = {
            quizId: quizId,
            attemptsNum: attemptsNum,
            lastAttemptDate: lastResult.startDate,
            lastScore: Math.round(lastResult.percentageScore),
        }
        return API
                .get("/quiz/"+quizId+"?fields=title")
                .then((res) => {
                    newScore = {
                        ...newScore,
                        quizTitle: res.data.title
                    }
                    this.setState({
                        scores: [...this.state.scores, newScore]
                    });
                })
                .catch(() => {
                    newScore = {
                        ...newScore,
                        quizTitle: "<unknown title>"
                    }
                    this.setState({
                        scores: [...this.state.scores, newScore]
                    });
                });
    }

    groupBy(key, array) {
        return array.reduce((objectsByKeyValue, obj) => {
            const value = obj[key];
            objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
            return objectsByKeyValue;
        }, {});
    }

    componentDidMount() {
        this.setState({ loading: true }, () => {
            this.getScores()
                .then((scores) => {
                    const apiPromises = Object.keys(scores).map(quizId => this.getQuizResult(quizId, scores[quizId]));
                    Promise
                        .all(apiPromises)
                        .then(() => {
                            const sortedScores = [...this.state.scores];
                            sortedScores.sort((prev,curr) => {
                                return new Date(curr.lastAttemptDate) - new Date(prev.lastAttemptDate);
                            });
                            this.setState({ 
                                scores: sortedScores,
                                loading: false 
                            })
                        });
                });
            });
    }

    render() {
        return (
            <div >
            {this.state.loading ?
                <Spinner animation="border" variant="info" />
                :
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Quiz title</th>
                            <th>Number of attempts</th>
                            <th>Last attempt date</th>
                            <th>Last score</th>
                            <th>Quiz statistics</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.scores.map(score => {
                        const start = new Date(score.lastAttemptDate); 
                        return <tr key={score.quizId}>
                            <td>{score.quizTitle}</td>
                            <td>{score.attemptsNum}</td>
                            <td>{start.toLocaleDateString() + " " + start.toLocaleTimeString()}</td>
                            <td>{score.lastScore + " %"}</td>
                            <td>
                                <Button 
                                    variant="outline-info" 
                                    href={"/statistics?quizId="+score.quizId}>
                                    Statistics
                                </Button>
                            </td>
                        </tr>
                        }
                    )}
                    </tbody>
                </Table>
            }
            </div>
        )
    }
}

export default ResultTable;