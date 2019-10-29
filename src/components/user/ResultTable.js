import React, { Component } from 'react';
import prettyMilliseconds from 'pretty-ms';
import { Table, Button, Spinner } from 'react-bootstrap';
import API from '../../utils/API';

export class ResultTable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            scores: []
        };
    }

    async getScores() {
        return API
                .get("/score")
                .then((res) => {
                    this.setState({
                        scores: res.data
                    });
                })
                .catch(err => {
                    console.log(err.response);
                });
    }

    componentDidMount() {
        this.setState({ loading: true }, () => {
            this
                .getScores()
                .then(() => {
                    this.state.scores.forEach((score,index) => {
                        const loadingFlag = index===this.state.scores.length-1;
                        API
                            .get("/quiz/"+score.quizId+"?fields=title")
                            .then((res) => {
                                this.setState(prevState => ({
                                    loading: loadingFlag ? false : prevState.loading,
                                    scores: prevState.scores.map(s => 
                                        s.id === score.id ? { ...s, quizTitle: res.data.title }: s)
                                }));
                            })
                            .catch(err => {
                                console.log(err.response);
                            });
                    });
                })
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
                            <td>{prettyMilliseconds(score.elapsedTimeInMs)}</td>
                            <td>
                                <Button 
                                    variant="outline-dark" 
                                    href={"/statistics?scoreId="+score.id+"&quizId="+score.quizId}>
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
