import Row from './Row';
import RowHeader from './RowHeader';
import React, { useState, useEffect } from 'react';

export default function MainPageContainer():React.JSX.Element {
  //create an array of row components
  const rows: React.JSX.Element[] = [];

  // get state
  const [dependencies, setDependencies] = useState([]);
  //const [backgroundColor, setBackgroundColor] = useState(['white', 'lightblue']);
  //make fetch request to get our data somewhere in here too

  // make a fetch request to our backend at the route /dependencies
  useEffect(() => {
    async function getDependencies() {
      let response = await fetch('/dependencies');
      const responseData = await response.json()
      setDependencies(responseData);
    }
    getDependencies();
  }, []); // call a useEffect here to fetch our data when the page loads and update state.
          // Our dependency array is an empty array, so that this only happens once on page load

  //iterate through state to make all of our rows, and push them into the array
  for(const dependency of dependencies){
    // for each subarray, create a new row, passing in the data from data, 
    // which we get from a fetch request to the back end
    rows.push(<Row key={dependency.name} api={dependency.apiVersion} status={dependency.deprecationStatus} location={dependency.name + " placeholder for when we get location"} stable={'placeholder, TBU'} notes={'placehlder, TBU'}/>);
  }

  // create the header row
  const headerNames: string[] = ['API', 'STATUS', 'LOCATION', 'STABLE VERSION', 'NOTES'];
  const header: React.JSX.Element[] = [];
  header.push(<RowHeader key={'row-header-key'} api={headerNames[0]} status={headerNames[1]} location={headerNames[2]} stable={headerNames[3]} notes={headerNames[4]}/>)

  return (
    <div className='mainPageContainer'>
      {header}
      {rows}
    </div>
  )
}