import React from 'react';
import MainPageContainer from './MainPageContainer';
import newLogo from '../images/newLogo.png';

export default function App():React.JSX.Element {

  return (
    <div className="app">
      <div className="kat-header">
      <img id='logo' src={newLogo}/>
      <h1>KUBERNETES API TRACKER</h1>
      </div>
      <MainPageContainer />
    </ div>
  );
}