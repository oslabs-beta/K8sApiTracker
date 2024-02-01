import Row from './Row';
import RowHeader from './RowHeader';
import React, { useState, useEffect } from 'react';

export default function MainPageContainer():React.JSX.Element {
  //create an array of row components
  const rows: React.JSX.Element[] = [];

  // get state
  const [data, setData] = useState([]);
  //const [backgroundColor, setBackgroundColor] = useState(['white', 'lightblue']);
  //make fetch request to get our data somewhere in here too

  // make a fetch request to our backend at the route /dependencies
  useEffect(() => {

    // async function() {
    //   const response = await fetch('/dependencies');
    // }
    // const dataArray = [];
    // for(const entry in response) {
    //   dataArray.push({
    //     api:,
    //     status:,
    //     location:
    //   })
    // }
    setData([{ api: 'apiString', status: 'Deprecated', location: 'some file path', stable: 'v1', notes: 'i am a teapot'}, { api: 'apiString', status: 'Removed', location: 'some file path', stable: 'v1', notes: 'i am a teapot'}, { api: 'apiString', status: 'Stable', location: 'some file path', stable: 'v1', notes: 'i am a teapot'}, { api: 'apiString', status: 'Deprecated', location: 'some file path', stable: 'v1', notes: 'i am a teapot'}]);
  }, []); // call a useEffect here to fetch our data when the page loads and update state.
          // Our dependency array is an empty array, so that this only happens once on page load


  //iterate through state to make all of our rows, and push them into the array
  for(const subarray of data){
    // for each subarray, create a new row, passing in the data from data, 
    // which we get from a fetch request to the back end
    rows.push(<Row api={subarray.api} status={subarray.status} location={subarray.location} stable={subarray.stable} notes={subarray.notes}/>);
  }

  // create the header row
  const headerNames: string[] = ['API', 'STATUS', 'LOCATION', 'STABLE VERSION', 'NOTES'];
  const header: React.JSX.Element[] = [];
  header.push(<RowHeader api={headerNames[0]} status={headerNames[1]} location={headerNames[2]} stable={headerNames[3]} notes={headerNames[4]}/>)

  return (
    <div className='mainPageContainer'>
      {header}
      {rows}
    </div>
  )
}