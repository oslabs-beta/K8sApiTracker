/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import ScanButtonContainer from '../src/ScanButtonsContainer'

describe('Test on ScanButtonContainer', () => {
  test('All related components should render', () => {
    const handleClick = jest.fn();
    const repoHandleChange = jest.fn();
    const chartHandleChange =jest.fn();
    render(<ScanButtonContainer key={`scanButton`} handleClick={() => handleClick('/dependencies')} isLoading={true} repoHandleChange={repoHandleChange()} chartHandleChange={chartHandleChange()}/>);
    const localButton = screen.getByText('Scan Local Cluster');
    expect(localButton).toBeDefined();
    const helmButton = screen.getByText('Scan Helm chart');
    expect(helmButton).toBeDefined();
    const repoInput = screen.getByPlaceholderText('Repo cmd');
    expect(repoInput).toBeDefined();
    const installInput = screen.getByPlaceholderText('Install cmd');
    expect(installInput).toBeDefined();
});

});