import React, { Component, Fragment } from 'react';
import API from '../../utils/API';
import { Button, Modal, Table, Spinner } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

export class ScorePopup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scores: [],
            actualScoreIdx: -1,
            loading: true
        };
    }

    handleShowAnswers(event) {
        const { history } = this.props;
        history.push('/score/'+this.props.score.id)
    }

    async getQuizScores(quizId) {
        return API
                .get('/statistics/ranking?quizId='+quizId)
                .then(res => {
                    this.setState({ 
                        scores: res.data
                    });
                });
    }

    componentDidMount() {
        this.setState({ loading: true }, () => {
            this.getQuizScores(this.props.score.quizId)
                .then(() => {
                    this.setState({ 
                        actualScoreIdx: this.state.scores.findIndex(s => s.id === this.props.score.id),
                        loading: false
                    });
                });
        });
    }

    render() {
        const { score } = this.props;
        const { scores, actualScoreIdx } = this.state;
        console.log(this.state)
        return (
            <div>
            {this.state.loading ?
                <Spinner animation="border" variant="info" />
                :
                <Fragment>
                <Modal.Header closeButton>
                    <Modal.Title>Your score</Modal.Title>
                </Modal.Header>
                    
                <Modal.Body className="scorePopup">
                    <div className="points">
                        <h1>Points</h1>
                        <h2>{score.goodAnswers}/{score.allAnswers} ({score.percentageScore} %)</h2>
                    </div>
                    <div className="ranking">
                        <Table responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Percentage score</th>
                                <th>Elapsed time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scores.map((s,id) => {
                                if(id<2 || id===scores.length-1 || (actualScoreIdx-1<=id && actualScoreIdx+1>=id)) {
                                    return <tr className={s.id===score.id ? "selectedRow" : "standardRow"}>
                                        <td>{id+1}</td>
                                        <td>{s.percentageScore}</td>
                                        <td>{moment.duration(s.elapsedTime).asSeconds().toFixed(3) + " s"}</td>
                                    </tr>
                                }
                                else if(id===scores.length-2 || id===2){
                                    return <tr >
                                        <td>...</td>
                                        <td>...</td>
                                        <td>...</td>
                                    </tr>
                                }
                                else {
                                    return null;
                                }
                            }
                            )}
                        </tbody>
                        </Table>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="dark" onClick={this.handleShowAnswers.bind(this)}>Show correct answers</Button>
                </Modal.Footer>
                </Fragment>
            }
            </div>
        )
    }
}

export default withRouter(ScorePopup);
