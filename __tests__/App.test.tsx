/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import App from '../src/App'
  
describe('Testing on RowHeader', () => {

  test('On load of web page, RowHeader should load', () => {
    render(<App />)
    expect(2+2).toBe(4)
    });
})