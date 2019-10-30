import React, { Component } from 'react';
import { LineChart, CartesianGrid, XAxis, YAxis, Line, Label } from 'recharts';
import moment from 'moment';

export class ScoreLineChart extends Component {
    prepareData(data) {
        data.forEach(element => {
            const dateStr = new Date(element.startDate).toDateString();
            element.startDate = new Date(dateStr).getTime();
        });
        data.sort((a, b) => (a.startDate > b.startDate) ? 1 : -1)
        var result=[], prev;
        data.forEach(score => {
            if ( score.startDate !== prev ) {
                result.push({
                    date: score.startDate,
                    count: 1
                });
            } else {
                result[result.length-1].count++;
            }
            prev = score.startDate;
        })
        return result;
    }

    render() {
        const data = this.props.data;
        const res = this.prepareData(data);
        return (
            <div className="chart">
                <LineChart width={750} height={350} data={res} margin={{ top: 30, right: 30, left: 20, bottom: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                        dataKey="date" 
                        domain = {['auto', 'auto']}
                        scale='time'
                        tickFormatter = {(unixTime) => moment(unixTime).format('Do/MM/YYYY')} 
                        type="number"
                    >
                        <Label value="Date" position="bottom" />
                    </XAxis>
                    <YAxis type="number" allowDecimals={false}>
                        <Label  value="Number of attempts" angle={-90} position='insideLeft' style={{textAnchor: 'middle'}}/>
                    </YAxis>
                    <Line strokeWidth={4} type="monotone" dataKey="count" stroke="rgb(135, 224, 0)" />
                </LineChart>
            </div>
        )
    }
}

export default ScoreLineChart
