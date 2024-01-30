import React, { useState } from 'react';
import MainContainer from './MainPageContainer';

export default function App():React.JSX.Element {

  return (
    <>
      <h1>Kubernetes Dependency Tracker</h1>
      <MainContainer />
    </>
  );
};