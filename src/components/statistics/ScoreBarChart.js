import React, { Component } from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Bar, Label } from 'recharts';

export class ScoreBarChart extends Component {

    prepareData(data) {
        const result = [];
        for ( var i = 0; i < 10; i++ ) {
            const start = i*10;
            const end = (i+1)*10-1;
            result.push({ 
                name: start + "-" + end,
                count: 0
            })
        }
        result.push({ 
            name: 100,
            count: 0
        })
        data.forEach(element => {
            const idx = ~~(element.percentageScore / 10);
            result[idx].count++;
        });
        return result;
    }

    render() {
        const data = this.props.data;
        var result = this.prepareData(data);
        return (
            <div className="chart">
                <BarChart width={750} height={350} data={result} margin={{ top: 15, right: 30, left: 20, bottom: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" >
                        <Label value="Percentage score" position="bottom" />
                    </XAxis>
                    <YAxis >
                        <Label  value="Number of attempts" angle={-90} position='insideLeft' style={{textAnchor: 'middle'}}/>
                    </YAxis>
                    <Bar dataKey="count" fill="rgb(135, 224, 0)" />
                </BarChart>
            </div>
        )
    }
}

export default ScoreBarChart
