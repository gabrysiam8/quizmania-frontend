import React, { Component } from 'react';
import API from '../../utils/API';
import QuestionPlay from './QuestionPlay';

export class ScorePage extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            scoreId: props.match.params.id,
            userAnswers: {}
        };
    }

    renderQuestion() {

    }
    componentDidMount() {
        API.get('/score/'+this.props.match.params.id)
            .then(res => {
                // console.log(res.data)
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
                    <QuestionPlay questionId={id} userAnswer={this.state.userAnswers[id]} handleNext={this.handleNext} play={false}/>
                )}
            </div>
        )
    }
}

export default ScorePage;
