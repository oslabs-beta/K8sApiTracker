/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import App from '../src/App'
// import MainPageContainer from '../src/';  
describe('Testing on RowHeader', () => {
    test('Test our App component', () => {
      // create our app component
      const {container} = render(<App />);
      // expect the component to exist
      expect({container}).toBeDefined()
      // the component contains an H1 with the text KUBERNETES API TRACKER
      const header = screen.getByText('KUBERNETES API TRACKER')
      expect(header).toBeDefined();
      // the component contains mainPageContainer     
      const mainPageContainer = container.getElementsByClassName('mainPageContainer');
      expect(mainPageContainer).toBeDefined();
    });
})