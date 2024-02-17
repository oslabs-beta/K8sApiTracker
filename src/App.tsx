import React from 'react';
import MainPageContainer from './MainPageContainer';
// import newLogo from '../newLogo.png';

export default function App():React.JSX.Element {

  return (
    <div className="app">
      {/* <img src={newLogo}/> */}
      <h1 className="kdt-header">KUBERNETES API TRACKER</h1>
      <MainPageContainer />
    </ div>
  );
}