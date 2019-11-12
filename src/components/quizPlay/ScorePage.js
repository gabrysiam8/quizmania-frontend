import React, { Component } from 'react';
import API from '../../utils/API';
import QuestionScore from './QuestionScore';
import { Button } from 'react-bootstrap';

export class ScorePage extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            scoreId: props.match.params.id,
            quizId: "",
            userAnswers: {},
            questions: []
        };

        this.handleTryAgain=this.handleTryAgain.bind(this);
    }

    async getScore(id) {
        return API
                .get('/score/'+id)
                .then(res => {
                    this.setState({ 
                        userAnswers: res.data.userAnswers,
                        quizId: res.data.quizId
                    });
                })
                .catch(err => {
                    console.log(err.response);
                });
    }

    handleTryAgain() {
        this.props.history.push("/play/"+this.state.quizId);    
    }

    componentDidMount() {
        this
            .getScore(this.props.match.params.id)
            .then(() => {
                    API
                        .get('/quiz/'+this.state.quizId+'/question?toScore=true')
                        .then(res => {
                            this.setState({
                                questions: res.data
                            });
                        })
                        .catch(err => {
                            console.log(err.response);
                        });
            });
    }

    render() {
        return (
            <div className="ScorePage">
                {this.state.questions.map(q =>
                    <QuestionScore key={q.id} question={q} userAnswer={this.state.userAnswers[q.id]}/>
                )}
                <Button variant="info" onClick={this.handleTryAgain}>Try again</Button>
            </div>
        )
    }
}

export default ScorePage;
