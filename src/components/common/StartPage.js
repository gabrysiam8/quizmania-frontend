import React , {Component} from 'react';
import API from '../../utils/API';
import QuizCard from './QuizCard';
import { Tab, Nav, Spinner } from 'react-bootstrap';

class StartPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            levels: [],
            quizzes: []
        };
    }

    async getDifficultyLevels() {
        return API
            .get("/quiz/level")
            .then(res => {
                this.setState({ levels: res.data });
            })
            .catch(err => {
                console.log(err.response);
            });
    }

    componentDidMount() {
        this.setState({ loading: true }, () => {
            this
                .getDifficultyLevels()
                .then(() => {
                    API.get('/quiz/all')
                        .then(res => {
                            this.setState({ 
                                loading: false,
                                quizzes: res.data 
                            });
                        })
                        .catch(err => {
                            this.setState({ loading: false });
                        });
            });
        });
    }

    render() {
        const { loading, levels, quizzes } = this.state;
        return (
            <div className="StartPage">
                <div className="pageTitle">
                    <h1>Discover quizzes</h1>
                </div>
                {loading ?
                    <Spinner animation="border" variant="info" />
                    :
                    <Tab.Container defaultActiveKey="ALL">
                        <Nav variant="pills" className="flex-row">
                            <Nav.Item>
                                <Nav.Link eventKey="ALL">ALL</Nav.Link>
                            </Nav.Item>
                            {levels.map(level => 
                                <Nav.Item>
                                    <Nav.Link eventKey={level}>{level}</Nav.Link>
                                </Nav.Item>
                            )}
                        </Nav>
                        <Tab.Content>
                            <Tab.Pane eventKey="ALL">
                                <div className="quizTable">
                                    {quizzes.map(quiz => 
                                        <QuizCard key={quiz.id} quiz={quiz} editable={false}/>
                                    )}
                                </div>
                            </Tab.Pane>
                            {levels.map(level => 
                                <Tab.Pane eventKey={level}>
                                    <div className="quizTable">
                                        {quizzes
                                            .filter(quiz => quiz.level === level)
                                            .map(quiz => <QuizCard key={quiz.id} quiz={quiz} editable={false}/>)
                                        }
                                    </div>
                                </Tab.Pane>
                            )}
                        </Tab.Content>
                    </Tab.Container>
                }
            </div>
        );
    }
}

export default StartPage;