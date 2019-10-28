import React, { Component } from 'react'
import ResultTable from './ResultTable'

export class UserResultPage extends Component {
    render() {
        return (
            <div className="UserResultPage">
                <div className="pageTitle">
                    <h1>Your results</h1>
                </div>
                <ResultTable/>
            </div>
        )
    }
}

export default UserResultPage
