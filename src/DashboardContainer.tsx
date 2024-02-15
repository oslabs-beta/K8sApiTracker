import React from 'react';
import PieChart from './PieChart'
import { DashboardContainerProps } from './types'

export default function DashboardContainer(props: DashboardContainerProps) :React.JSX.Element {
  return (
    <div className='dashboardcontainer'>
        <div className="pie-chart-container">
          <PieChart chartData={props.chartData}/>          
          <div>stable: {props.chartData[0].value}</div>
          <div>updateAvailable: {props.chartData[1].value}</div>
          <div>removed: {props.chartData[2].value}</div>
        </div>
        <div className="vl"></div>
        <div className="version-eol">
          <div id='text365'>365</div>
          <div>Days Until Version EOL</div>
        </div>
    </div>
  )
}