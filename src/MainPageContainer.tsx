import Column from './Row';
import React, { useState } from 'react';


export default function MainContainer():React.JSX.Element {
  //create an array of row components
  const rows: React.JSX.Element[] = [];

  // get state
  const [data, setData] = useState([['API', 'Status', 'Location'],['api example', 'status example', 'location example']])
  //make fetch request to get our data somewhere in here too

  //iterate through state to make all of our rows
  for(const subarray of data){
    // for each subarray, create a new row, passing in the data from data, 
    // which we get from a fetch request to the back end
    rows.push(<Column api={subarray[0]} status={subarray[1]} location={subarray[2]}/>)
  }

    return (
      <div className='mainContainer'>
        {rows}
      </div>
    )
}