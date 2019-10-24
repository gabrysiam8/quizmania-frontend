import React, { Component } from 'react';
import API from '../../utils/API';
import QuestionScore from './QuestionScore';

export class ScorePage extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            scoreId: props.match.params.id,
            quizId: "",
            userAnswers: {},
            questions: []
        };
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

    componentDidMount() {
        this
            .getScore(this.props.match.params.id)
            .then(() => {
                    API
                        .get('/quiz/'+this.state.quizId+'/question')
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
            <div>
                {this.state.questions.map(q =>
                    <QuestionScore question={q} userAnswer={this.state.userAnswers[q.id]}/>
                )}
            </div>
        )
    }
}

export default ScorePage;
