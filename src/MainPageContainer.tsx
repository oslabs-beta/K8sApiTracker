import Row from './Row';
import RowHeader from './RowHeader';
import React, { useState, useEffect } from 'react';
import { SpinningCircles } from 'react-loading-icons'

// use this website to change loading icon https://www.npmjs.com/package/react-loading-icons

export default function MainPageContainer(): React.JSX.Element {
  //create an array of row components
  let rows: React.JSX.Element[] = [];

  // initialize our state
  const [dependencies, setDependencies] = useState([]);
  const [renderedDependencies, setRenderedDependencies] = useState([]);
  const [isLoading, setLoading] = useState(true)
  const [statuses, setStatuses] = useState<string[]>(['stable', 'updateAvailable', 'removed']);
  
  // make a fetch request to our backend at the route /dependencies.
  // call a useEffect here to fetch our data when the page loads and update state.
  // Our dependency array is an empty array, so that this only happens once on page load
  useEffect(() => {
    async function getDependencies() {
      let response = await fetch('/dependencies');
      const responseData = await response.json()
      setDependencies(responseData);
      setRenderedDependencies(responseData)
      setLoading(false);
    }
    getDependencies();
  }, []);

  useEffect(()=> {
    console.log(renderedDependencies)
    // create a new array
    const newArr: any[] = [];
    //add all that are in the desired group from our master data
    for (const dependency of dependencies) {
      // only add it if the user has filtered for it
      if(statuses.includes(dependency.deprecationStatus)){
        console.log(statuses, dependency.deprecationStatus)
        newArr.push(dependency);
      }
    }
    //update the state
    setRenderedDependencies(newArr);
  }, [statuses])

  function updateStatuses(status: string){
    //if statuses has the string, remove it
    if(statuses.includes(status)){
      const newStatuses: string[] = [...statuses]
      newStatuses.splice(newStatuses.indexOf(status),1);
      setStatuses(newStatuses);
    }
    //otherwise, add it
    else {
      const newStatuses: string[] = [...statuses, status]
      setStatuses(newStatuses);
    }
  }

  //iterate through state to make all of our rows, and push them into the array
  for (const dependency of renderedDependencies) {
    // for each subarray, create a new row, passing in the data from data, 
    // which we get from a fetch request to the back end
    rows.push(<Row key={dependency.name} api={dependency.apiVersion} status={dependency.deprecationStatus} location={dependency.name}
      stable={dependency.newVersion ? dependency.newVersion : 'Up to date'} notes={dependency.description ? dependency.description : 'NA'} />);      
  }

  return (
    <div className='mainPageContainer'>
      <RowHeader key={'row-header-key'} api='API' status='STATUS' location='LOCATION' stable='STABLE VERSION' notes='NOTES' filters={statuses} filter={updateStatuses}/>
      {isLoading? <SpinningCircles className="content-loading" /> : null}
      <div className='row-content-container'>
        {rows}        
      </div>
    </div>
  )
}