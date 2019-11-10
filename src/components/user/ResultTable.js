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

    async getQuizTitle(id) {
        return API
                .get("/quiz/"+id+"?fields=title")
                .then((res) => {
                    return res.data.title;
                })
                .catch(() => {
                    return "<unknown title>";
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
                    Object.keys(scores).forEach(quizId => {
                        const attemptsNum = scores[quizId].length;
                        const lastResult = scores[quizId].reduce((prev, current) => (moment(prev.startDate).isAfter(current.startDate)) ? prev : current);

                        this.getQuizTitle(quizId)
                            .then(title => {
                                const newScore = {
                                    quizId: quizId,
                                    quizTitle: title,
                                    attemptsNum: attemptsNum,
                                    lastAttemptDate: lastResult.startDate,
                                    lastScore: lastResult.percentageScore,
                                }
                                this.setState({
                                    scores: [...this.state.scores, newScore]
                                })
                            })
                            .then(() => this.setState({ loading: false }));
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
                        return <tr key={score.id}>
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

export default ResultTable
