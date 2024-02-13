/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import MainPageContainer from '../src/MainPageContainer'
// import MainPageContainer from '../src/';  
describe('Testing on MainPageContainer', () => {
    test('Test our MainPageContainer component', () => {
        //render MainPageContainer
        const {container} = render(<MainPageContainer/>);
      // expect the component to exist
      const scanButtonContainer = screen.queryByTestId('scanButtonContainer');
      expect(scanButtonContainer).toBeDefined();
      //test on conditional rendering of RowHeader component
    //   if(!showRowHeader){
    //     expect(<RowHeader/>).toBeNull();
    //   } else {
    //     expect(<RowHeader/>).toBeDefined();
    //   };
    //   //test on conditional rendering of spinningCircles component
    //   if (isLoading){
    //     expect(<SpinningCircles/>).toBeDefined();
    //   };
      const rowContentContainer = container.getElementsByClassName('row-content-container');
      expect(rowContentContainer).toBeDefined();

     
    });
})