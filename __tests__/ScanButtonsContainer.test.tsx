/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import ScanButtonContainer from '../src/ScanButtonsContainer'

describe('Test on ScanButtonContainer', () => {
  test('Button should render after page is loaded', () => {
    const handleClick = jest.fn();
    const repoHandleChange = jest.fn();
    const chartHandleChange =jest.fn();
    render(<ScanButtonContainer handleClick={handleClick} isLoading={false} repoHandleChange={repoHandleChange()} chartHandleChange={chartHandleChange()}/>);
    const localButton = screen.getByText('Scan Local Cluster');
    expect(localButton).toBeDefined();
    const helmButton = screen.getByText('Scan Helm chart');
    expect(helmButton).toBeDefined();
    const repoInput = screen.getByPlaceholderText('Repo cmd');
    expect(repoInput).toBeDefined();
    const installInput = screen.getByPlaceholderText('Install cmd');
    expect(installInput).toBeDefined();
    fireEvent.click(localButton);
    fireEvent.click(localButton);
    expect(handleClick).toHaveBeenCalledTimes(2);
    fireEvent.click(helmButton);
    expect(handleClick).toHaveBeenCalledTimes(3);
    fireEvent.click(localButton);
    expect(handleClick).toHaveBeenCalledTimes(4);
});
test('Button should not render when page is loading', () => {
    const handleClick = jest.fn();
    const repoHandleChange = jest.fn();
    const chartHandleChange =jest.fn();
    render(<ScanButtonContainer handleClick={handleClick} isLoading={true} repoHandleChange={repoHandleChange()} chartHandleChange={chartHandleChange()}/>);
    const localButton = screen.getByText('Scan Local Cluster');
    expect(localButton).toBeDefined();
    const helmButton = screen.getByText('Scan Helm chart');
    expect(helmButton).toBeDefined();
    const repoInput = screen.getByPlaceholderText('Repo cmd');
    expect(repoInput).toBeDefined();
    const installInput = screen.getByPlaceholderText('Install cmd');
    expect(installInput).toBeDefined();
    fireEvent.click(localButton);
    fireEvent.click(localButton);
    expect(handleClick).toHaveBeenCalledTimes(0);
    fireEvent.click(helmButton);
    expect(handleClick).toHaveBeenCalledTimes(0);
    fireEvent.click(helmButton);
    expect(handleClick).toHaveBeenCalledTimes(0);
});
});