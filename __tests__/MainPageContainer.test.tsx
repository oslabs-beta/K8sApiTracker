/**
* @jest-environment jsdom
*/

import { render, screen } from '@testing-library/react';
import React from 'react';
import MainPageContainer from '../src/MainPageContainer';

// import MainPageContainer from '../src/'; 
describe('Testing on MainPageContainer', () => {
  test('Test our MainPageContainer component', () => {
    //render MainPageContainer
    const {container} = render(<MainPageContainer/>);
    // expect the component to exist
    const scanButtonContainer = screen.queryByTestId('scanButtonContainer');
    expect(scanButtonContainer).toBeDefined();
    const rowContentContainer = container.getElementsByClassName('row-content-container');
    expect(rowContentContainer).toBeDefined();
});
// test('render rowHeader if showRowHeader is true', () => {
// const {container} = render(<MainPageContainer/>);
// const roe
// // You can add more specific queries based on your actual component structure
// expect(screen.getByText('API')).toBeInTheDocument();
// expect(screen.getByText('STATUS')).toBeInTheDocument();
// })
})




