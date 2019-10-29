import React, { Component } from 'react';
import { LineChart, CartesianGrid, XAxis, YAxis, Line, Label } from 'recharts';
import prettyMilliseconds from 'pretty-ms';

export class ScoreLineChart extends Component {
    prepareData(data) {
        data.sort((a, b) => (a.elapsedTime > b.elapsedTime) ? 1 : -1)
        data.forEach(score => {
            score.elapsedTime = prettyMilliseconds(score.elapsedTime);
        });
    }

    render() {
        const data = this.props.data;
        this.prepareData(data);
        return (
            <div className="chart">
                <LineChart width={750} height={350} data={data} margin={{ top: 30, right: 30, left: 20, bottom: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="elapsedTime" >
                        <Label value="Elapsed time" position="bottom" />
                    </XAxis>
                    <YAxis type="number" domain={[0, 100]}>
                        <Label  value="Percentage score" angle={-90} position='insideLeft' style={{textAnchor: 'middle'}}/>
                    </YAxis>
                    <Line strokeWidth={4} type="monotone" dataKey="percentageScore" stroke="rgb(135, 224, 0)" />
                </LineChart>
            </div>
        )
    }
}

export default ScoreLineChart
