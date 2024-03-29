import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { PieChartProps } from './types'

export default function PieChartC(props: PieChartProps): React.JSX.Element {
    return (
        <div>
            <PieChart width={200} height={200}>
                <Pie 
                    data={props.chartData} 
                    dataKey="value" cx="50%" 
                    cy="50%" 
                    outerRadius={50} 
                    fill={'#000000'}
                >
                {props.chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
                </Pie>
            </PieChart>
        </div>
    );
}
