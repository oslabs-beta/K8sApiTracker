import React, { useState } from 'react';
import MainPageContainer from './MainPageContainer';
// import SummaryContainer from './SummaryContainer';

export default function App():React.JSX.Element {

  return (
    <div className="app">
      <h1 className="kdt-header">Kubernetes Dependency Tracker</h1>
      <MainPageContainer />
    </ div>
  );
};