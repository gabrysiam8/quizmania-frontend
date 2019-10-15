import React , {Component} from 'react';
import API from '../utils/API';
import QuizCard from './QuizCard';

class StartPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            quizzes: []
        };
    }

    componentDidMount() {
        API.get('/quiz/all')
            .then(res => {
                this.setState({ quizzes: res.data });
            })
            .catch(err => {
                console.log(err.response);
            });
    }

    render() {
        return (
            <div className="StartPage">
                <div className="pageTitle">
                    <h1>Discover quizzes</h1>
                </div>
                <div className="quizTable">
                    {this.state.quizzes.map(quiz =>
                        <QuizCard quiz={quiz} editable={false}/>
                    )}
                </div>
            </div>
        );
    }
}

export default StartPage;