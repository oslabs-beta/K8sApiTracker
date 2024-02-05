import Row from './Row';
import RowHeader from './RowHeader';
import React, { useState, useEffect } from 'react';

export default function MainPageContainer(): React.JSX.Element {
  //create an array of row components
  const rows: React.JSX.Element[] = [];

  // initialize our state
  const [dependencies, setDependencies] = useState([]);

  // make a fetch request to our backend at the route /dependencies.
  // call a useEffect here to fetch our data when the page loads and update state.
  // Our dependency array is an empty array, so that this only happens once on page load
  useEffect(() => {
    async function getDependencies() {
      let response = await fetch('/dependencies');
      const responseData = await response.json()
      console.log(responseData)
      setDependencies(responseData);
    }
    getDependencies();
  }, []);

  //iterate through state to make all of our rows, and push them into the array
  for (const dependency of dependencies) {
    // for each subarray, create a new row, passing in the data from data, 
    // which we get from a fetch request to the back end
    rows.push(<Row key={dependency.name} api={dependency.apiVersion} status={dependency.deprecationStatus} location={dependency.name}
      stable={dependency.newVersion ? dependency.newVersion : 'Up to date'} notes={dependency.description ? dependency.description : 'NA'} />);
  }

  return (
    <div className='mainPageContainer'>
      <RowHeader key={'row-header-key'} api='API' status='STATUS' location='LOCATION' stable='STABLE VERSION' notes='NOTES' />
      {rows}
    </div>
  )
}