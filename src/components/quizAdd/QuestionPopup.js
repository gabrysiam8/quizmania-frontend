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
                answers:  initialState.question.answers,
                answerCount: initialState.question.answers.length,
                arrIndex: initialState.arrIndex
            }
            :
            {
                question: "",
                answers:  ["",""],
                answerCount: 2,
            }
        
        return (
            <div className="QuestionPopup">
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
