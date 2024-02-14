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
  let showRowHeader;
  test('render rowHeader if showRowHeader is true', () => {
    const { container } = render(<MainPageContainer/>);
    showRowHeader = true;
    const rowHeader = container.getElementsByClassName('rowHeader');
    expect(rowHeader).toBeDefined();
})
  test(`Don't render rowHeader if showRowHeader is false`, () => {
    const { container } = render(<MainPageContainer/>);
    showRowHeader = false;
    const rowHeader = container.getElementsByClassName('rowHeader');
    console.log('rowHeader', rowHeader)
    expect(rowHeader).toBeUndefined();
})
})




