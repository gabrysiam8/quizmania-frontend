import React, { Component } from 'react'
import QuestionForm from './QuestionForm';


export class QuestionPopup extends Component {

    render() {
        const { initialState } = this.props;
        const editMode = initialState.arrIndex==null ? false : true;
        const question = editMode ?
            {
                id: initialState.question.id,
                question: initialState.question.question,
                badAnswers:  initialState.question.badAnswers,
                correctAnswer:  initialState.question.correctAnswer,
                answerCount: initialState.question.badAnswers.length,
                arrIndex: initialState.arrIndex
            }
            :
            {
                question: "",
                badAnswers:  [""],
                answerCount: 1,
            }
        
        return (
            <div className="centerPopup">
                <QuestionForm 
                    editMode={editMode}
                    initialState={question} 
                    handleQuestionAdd={this.props.handleQuestionAdd}
                    handleQuestionEdit={this.props.handleQuestionEdit}/>
            </div>
        )
    }
}

export default QuestionPopup;
