import Row from './Row';
import RowHeader from './RowHeader';
import ScanButtonsContainer from './ScanButtonsContainer';
// import DashboardContainer from './DashboardContainer';
import React, { useState } from 'react';
import { SpinningCircles } from 'react-loading-icons'

// use this website to change loading icon https://www.npmjs.com/package/react-loading-icons

// define types
type ApiObj = {
  deprecationStatus: string,
  location: string,
  apiVersion: string,
  name: string,
  description: string,
  newVersion: string
}
type MainData = ApiObj[];

export default function MainPageContainer(): React.JSX.Element {
  //create an array of row components
  const rows: React.JSX.Element[] = [];

  //this is necessary to maintain the typing of our dependencies
  const arr: MainData = [];

  // initialize our state
  const [dependencies, setDependencies] = useState(arr);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [showRowHeader, setRowHeader] = useState(false);
  const [filters, setFilters] = useState<string[]>(['stable', 'updateAvailable', 'removed']);
  const [helmChartPath, setHelmChartPath] = useState<string>('');
  const [helmRepoPath, setHelmRepoPath] = useState<string>('');


  // create two versions of the scanButton - one for directory scans, one for helm chart scans
  // change the fetch request based on which button is clicked, and if it is a Helm scan attach the input data
  // disable the buttons until the new rows load and clear out the old rows
  const handleClick = (endpoint: string) => {
    setDependencies([]);
    async function getDependencies(): Promise<void> {
      if (endpoint === '/helm') {
        setLoading(true);
        try {
          let response = await fetch(`/helm`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              helmChartPath: helmChartPath,
              helmRepoPath: helmRepoPath
            })
          });
          const responseData = await response.json();
          console.log('responseData: ', responseData);
          //sort the response data alphabetically by deprecation status
          responseData.sort((a: any, b: any) => {
            if (a.deprecationStatus < b.deprecationStatus) return -1;
            if (a.deprecationStatus > b.deprecationStatus) return 1;
            return 0;
          })
          setRowHeader(true);
          setDependencies(responseData);
          setHelmChartPath('');
          setHelmRepoPath('');
          setLoading(false);
        }
        catch {
          alert('Repo not linked. Please copy heml repo add command.');
          setHelmChartPath('');
          setHelmRepoPath('');
          setLoading(false);
        }


        const response = await fetch(`/helm`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            helmChartPath: helmChartPath,
            helmRepoPath: helmRepoPath
          })
        });
        const responseData = await response.json();
        //sort the response data alphabetically by deprecation status
        responseData.sort((a: ApiObj, b: ApiObj) => {
          if (a.deprecationStatus < b.deprecationStatus) return -1;
          if (a.deprecationStatus > b.deprecationStatus) return 1;
          return 0;
        })
        setRowHeader(true);
        setDependencies(responseData);
        setHelmChartPath('');
        setHelmRepoPath('');
        setLoading(false);
      } else if (endpoint === '/dependencies') {
        setLoading(true);
        const response = await fetch(`${endpoint}`);
        const responseData = await response.json();
        //sort the response data alphabetically by deprecation status
        responseData.sort((a: ApiObj, b: ApiObj) => {
          if (a.deprecationStatus < b.deprecationStatus) return -1;
          if (a.deprecationStatus > b.deprecationStatus) return 1;
          return 0;
        })
        setRowHeader(true);
        setDependencies(responseData);
        setLoading(false);
      }
    }
    getDependencies();
  }

  const chartHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHelmChartPath(event.target.value);
  }
  const repoHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHelmRepoPath(event.target.value);
  }

  function updateFilters(status: string) {
    //if the filter is already applied, remove it from the filters array
    if (filters.includes(status)) {
      const newFilters: string[] = [...filters]
      newFilters.splice(newFilters.indexOf(status), 1);
      setFilters(newFilters);
    }
    // if the filter is not already applied, add it to the filters array
    else {
      setFilters([...filters, status]);
    }
  }

  //iterate through state to make all of our rows, and push them into the array
  for (const dependency of dependencies) {
    // for each subarray, create a new row, passing in the data from data, 
    // which we get from a fetch request to the back end
    if (filters.includes(dependency.deprecationStatus)) {
      rows.push(<Row key={dependency.location + dependency.apiVersion} api={dependency.apiVersion} status={dependency.deprecationStatus} location={dependency.name}
        stable={dependency.newVersion ? dependency.newVersion : 'Up to date'} notes={dependency.description ? dependency.description : 'NA'} />);
    }
  }

  return (
    <div id='mainPageContainer'>
      <ScanButtonsContainer key="scanButtonContainer" handleClick={handleClick} isLoading={isLoading} repoHandleChange={repoHandleChange} chartHandleChange={chartHandleChange} helmChartPath={helmChartPath} helmRepoPath={helmRepoPath} />
      {/* <DashboardContainer /> */}
      {showRowHeader ? <RowHeader key={'row-header-key'} api='API' status='STATUS' location='LOCATION' stable='STABLE VERSION' notes='NOTES' filters={filters} filter={updateFilters} /> : false}
      {isLoading ? <SpinningCircles className="content-loading" /> : null}
      <div className='row-content-container'>
        {rows}
      </div>
    </div>
  )
}