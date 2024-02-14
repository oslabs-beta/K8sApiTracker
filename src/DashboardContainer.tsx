import React from 'react';
import PieChart from './PieChart'

type PieChartData = {name: string, value: number}
type DashboardContainerProps = {
  chartData: PieChartData[]
}

export default function DashboardContainer(props: DashboardContainerProps) :React.JSX.Element {

  return (
    <div className='dashboardcontainer'>
        <PieChart chartData={props.chartData}/>
        <div>
          <div>365</div>
          <div>Days Until Version EOL</div>
        </div>
    </div>
  )
}