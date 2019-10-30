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
                    this.setState({
                        scores: res.data
                    });
                    return res.data;
                })
                .catch(err => {
                    console.log(err.response);
                });
    }

    async getQuizTitle(id) {
        return API
                .get("/quiz/"+id+"?fields=title")
                .then((res) => {
                    this.setState(prevState => ({
                        scores: prevState.scores.map(s => 
                            s.quizId === id ? { ...s, quizTitle: res.data.title }: s)
                    }));
                })
                .catch(err => {
                    console.log(err.response);
                });
    }

    componentDidMount() {
        this.setState({ loading: true }, () => {
            this
                .getScores()
                .then((scores) => {
                    const quizIds= scores.map(score => score.quizId);
                    const uniqIds = [...new Set(quizIds)];

                    const apiPromises = uniqIds.map((quizId) => this.getQuizTitle(quizId) );
                    Promise
                        .all(apiPromises)
                        .then(() => this.setState({ loading: false }));
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
                            <th>Quiz</th>
                            <th>Good answers</th>
                            <th>All answers</th>
                            <th>Percentage score</th>
                            <th>Start time</th>
                            <th>Elapsed time</th>
                            <th>Quiz statistics</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.scores.map(score => {
                        const start = new Date(score.startDate); 
                        return <tr key={score.id}>
                            <td>{score.quizTitle}</td>
                            <td>{score.goodAnswers}</td>
                            <td>{score.allAnswers}</td>
                            <td>{score.percentageScore}</td>
                            <td>{start.toLocaleDateString() + " " + start.toLocaleTimeString()}</td>
                            <td>{moment.duration(score.elapsedTimeInMs).asSeconds()+ ' s'}</td>
                            <td>
                                <Button 
                                    variant="outline-dark" 
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
