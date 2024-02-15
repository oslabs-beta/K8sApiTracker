import React from 'react';
import MainPageContainer from './MainPageContainer';
// import newLogo from '../newLogo.png';

export default function App():React.JSX.Element {

  return (
    <div className="app">
      {/* <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEZcF_N4K919kShQ4TVlHXASGMNHD4QEXeSj7hrNzRbg&s'/> */}
      {/* <img src='../newLogo.png'/> */}
      <h1 className="kdt-header">KUBERNETES API TRACKER</h1>
      <MainPageContainer />
    </ div>
  );
}