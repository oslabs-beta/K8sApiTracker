import ScanButton from './ScanButton';
import React from 'react';

type ScanButtonsContainerProps = {
    handleClick: (endpoint: string)=> void,
    isLoading: boolean,
    repoHandleChange: (event: React.ChangeEvent<HTMLInputElement>)=> void,
    chartHandleChange: (event: React.ChangeEvent<HTMLInputElement>)=> void,  
}

export default function ScanButtonsContainer(props: ScanButtonsContainerProps): React.JSX.Element {
  return (
    <div id='scanButtonContainer'> 
        <ScanButton id={0} key={`scanButton0`} text={'Scan a directory of .yaml files'} onClick={() => props.handleClick('/dependencies')} isLoading={props.isLoading} />
        <div id='helmSection'>
          <p>Or scan a Helm Chart before installing:</p>
          <input type='textz' id='helmRepoInput' name='helmRepoInput' placeholder='Repo cmd' onChange={props.repoHandleChange} />
          <input type='text' id='helmChartInput' name='helmChartInput' placeholder='Install cmd' onChange={props.chartHandleChange} />
          <ScanButton id={1} key={'scanButton1'} text='Scan Helm chart' onClick={() => props.handleClick('/helm')} isLoading={props.isLoading} />
        </div>
    </div>
  )
}

