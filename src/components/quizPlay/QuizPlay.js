import React, { Component } from 'react';
import API from '../../utils/API';
import { Button, Modal } from 'react-bootstrap';
import QuestionPlay from './QuestionPlay';
import ScorePopup from './ScorePopup';

class QuizPlay extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            quizId: props.match.params.id,
            questionIds: [],
            actualQuestion: 0,
            startDate: Date.now(),
            userAnswers: {},
            showModal: false,
            score: {}
        };
        this.handleNext = this.handleNext.bind(this);
        this.handleFinish = this.handleFinish.bind(this);
        this.handleTryAgain = this.handleTryAgain.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
    }

    handleNext(event, selectedAnswer) {
        const question= this.state.questionIds[this.state.actualQuestion];

        this.setState({
            actualQuestion: this.state.actualQuestion+1,
            userAnswers: {
                ...this.state.userAnswers,
                [question]: selectedAnswer
            }
        }, () => {
            if(this.state.actualQuestion === this.state.questionIds.length) {
                this.handleFinish();
            }
        });
    }

    handleFinish() {
        const { quizId, startDate, userAnswers } = this.state;
        const newScore = {
            quizId, 
            startDate, 
            endDate: Date.now(),
            userAnswers
        }

        API
            .post('/score', newScore)
            .then(res => {
                this.setState({
                    score: res.data,
                    showModal: true
                });
            })
            .catch(err => {
                console.log(err.response);
            });
    }

    handleTryAgain() {
        window.location.reload();        
    }

    togglePopup() {
        this.setState({
          showModal: !this.state.showModal
        });
    }

    componentDidMount() {
        API.get('/quiz/'+this.state.quizId)
            .then(res => {
                this.setState({ questionIds: res.data.questionIds });
            })
            .catch(err => {
                console.log(err.response);
            });
    }

    render() {
        let button = this.state.actualQuestion === this.state.questionIds.length ? <Button variant="dark" onClick={this.handleTryAgain}>Try again</Button> : null;

        return (
            <div className="QuizPlay">
                {this.state.actualQuestion < this.state.questionIds.length
                ?
                    <QuestionPlay questionId={this.state.questionIds[this.state.actualQuestion]} handleNext={this.handleNext}/>
                :
                    null
                }
                {button}
                <Modal show={this.state.showModal} onHide={this.togglePopup} size="lg" scrollable>
                    <ScorePopup score={this.state.score}/>
                </Modal>
            </div>
        )
    }
}

export default QuizPlay;
