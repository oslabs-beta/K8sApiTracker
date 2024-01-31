import React, { useState } from 'react';
import MainContainer from './MainPageContainer';

export default function App():React.JSX.Element {

  return (
    <div className="app">
      <h1>Kubernetes Dependency Tracker</h1>
      <MainContainer />
    </ div>
  );
};