import React, { Component } from 'react';
import API from '../../utils/API';
import QuestionScore from './QuestionScore';

export class ScorePage extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            scoreId: props.match.params.id,
            userAnswers: {}
        };
    }

    componentDidMount() {
        API.get('/score/'+this.props.match.params.id)
            .then(res => {
                this.setState({ userAnswers: res.data.userAnswers });
            })
            .catch(err => {
                console.log(err.response);
            });
    }

    render() {
        return (
            <div>
                {Object.keys(this.state.userAnswers).map(id =>
                    <QuestionScore questionId={id} userAnswer={this.state.userAnswers[id]} play={false}/>
                )}
            </div>
        )
    }
}

export default ScorePage;
