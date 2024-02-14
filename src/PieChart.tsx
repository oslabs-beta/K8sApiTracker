import React from 'react';
import { PieChart, Pie } from 'recharts';

type PieChartData = {name: string, value: number}
type PieChartProps = {
    chartData: PieChartData[]
}

export default function PieChartC(props: PieChartProps): React.JSX.Element {
    return (
        <div>
            <PieChart width={200} height={200}>
                <Pie data={props.chartData} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" />
            </PieChart>
        </div>
    );
}
