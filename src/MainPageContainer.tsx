import Column from './Row';
import RowHeader from './RowHeader';
import React, { useState } from 'react';

export default function MainContainer():React.JSX.Element {
  //create an array of row components
  const rows: React.JSX.Element[] = [];

  // get state
  const [data, setData] = useState([['API1API1API1API1API1API1API1API1API1API1API1API1API1API1API1API1API1', 
  'Status1', 'Location1'], ['API2', 'Status2', 'Location2'], ['API3', 'Status3', 'Location3']]);
  const [backgroundColor, setBackgroundColor] = useState(['white', 'lightblue']);
  //make fetch request to get our data somewhere in here too

  //iterate through state to make all of our rows, and push them into the array
  for(const subarray of data){
    // for each subarray, create a new row, passing in the data from data, 
    // which we get from a fetch request to the back end
    rows.push(<Column api={subarray[0]} status={subarray[1]} location={subarray[2]} backgroundColor={backgroundColor[0]}/>)
  }

  // create the header row
  const headerNames: string[] = ['API', 'Status', 'Location'];
  const header: React.JSX.Element[] = [];
  header.push(<RowHeader api={headerNames[0]} status={headerNames[1]} location={headerNames[2]}/>)

  return (
    <div className='mainContainer'>
      {header}
      {rows}
    </div>
  )
}