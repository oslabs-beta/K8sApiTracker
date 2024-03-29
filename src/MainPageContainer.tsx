import Row from './Row';
import RowHeader from './RowHeader';
import ScanButtonsContainer from './ScanButtonsContainer';
import DashboardContainer from './DashboardContainer';
import React, { useState, useEffect } from 'react';
import { ApiObj, MainData, PieChartInfo } from './types'

export default function MainPageContainer(): React.JSX.Element {
  //create an array of row components
  const rows: React.JSX.Element[] = [];

  // initialize our state
  const [dependencies, setDependencies] = useState<MainData>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [showRowHeader, setRowHeader] = useState(false);
  const [filters, setFilters] = useState<string[]>(['stable', 'updateAvailable', 'removed']);
  const [helmChartPath, setHelmChartPath] = useState<string>('');
  const [helmRepoPath, setHelmRepoPath] = useState<string>('');
  const [pieChartInfo, setPieChartInfo] = useState<PieChartInfo>([])

  // create two versions of the scanButton - one for directory scans, one for helm chart scans
  // change the fetch request based on which button is clicked, and if it is a Helm scan attach the input data
  // disable the buttons until the new rows load and clear out the old rows
  const handleClick = (endpoint: string) => {
    setDependencies([]);
    async function getDependencies(): Promise<void> {
      if (endpoint === '/helm') {
        setLoading(true);
        try {
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
        }
        catch {
          alert('An error has occured! Please make sure both the repo link and chart install commands are entered. Otherwise, the goof is on us!');
          setHelmChartPath('');
          setHelmRepoPath('');
          setLoading(false);
        }

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
      rows.push(<Row key={dependency.location + dependency.apiVersion} api={dependency.apiVersion} status={dependency.deprecationStatus} location={dependency.location}
        stable={dependency.newVersion ? dependency.newVersion : 'Up to date'} notes={dependency.description ? dependency.description : 'NA'} />);
    }
  }

  //iterate through state to make all of our rows, and push them into the array
  useEffect(() => {
    //create an array
    const arr: PieChartInfo = [];
    let stable = 0;
    let updateAvailable = 0;
    let removed = 0;
    //count all of the types
    for (const dependency of dependencies) {
      // increment the array of data
      if (dependency.deprecationStatus === 'stable') stable++;
      if (dependency.deprecationStatus === 'updateAvailable') updateAvailable++;
      if (dependency.deprecationStatus === 'removed') removed++;
    }
    arr.push({ name: 'stable', value: stable, color: '#4AFF95' }, { name: 'updateAvailable', value: updateAvailable, color: '#FFCC00' }, { name: 'removed', value: removed, color: '#FF0400' })
    //update the chartData
    setPieChartInfo(arr);
  }, [dependencies])

  return (
    <div className="main-outer-div">
      <div className="buttons-and-dashboard-container">
        {showRowHeader ? <DashboardContainer chartData={pieChartInfo} /> : false}
        <ScanButtonsContainer key="scanButtonContainer" handleClick={handleClick} isLoading={isLoading} repoHandleChange={repoHandleChange} chartHandleChange={chartHandleChange} helmChartPath={helmChartPath} helmRepoPath={helmRepoPath} />
      </div>
      {showRowHeader ?
        <div id='mainPageContainer'>
          <RowHeader key={'row-header-key'} api='API' status='STATUS' location='LOCATION' stable='STABLE VERSION' notes='NOTES' filters={filters} filter={updateFilters} />
          <div className='row-content-container'>
            {rows}
          </div>
        </div>
        : false}
    </div>
  )
}