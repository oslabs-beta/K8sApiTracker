import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DashboardContainer from '../src/DashboardContainer';

describe('DashboardContainer', () => {
  // Sample data for props
  const chartDataMock = [
    { name: 'stable', value: 60, color: '#4caf50' }, 
  { name: 'updateAvailable', value: 30, color: '#ff9800' }, 
  { name: 'removed', value: 10, color: '#f44336' }, 
  ];

  it('renders without crashing', () => {
    render(<DashboardContainer chartData={chartDataMock} />);
    expect(screen.getByText('Days Until Version EOL')).toBeDefined();
  });

  it('displays the correct chart data values', () => {
    render(<DashboardContainer chartData={chartDataMock} />);
    expect(screen.getByText('stable: 60')).toBeDefined();
    expect(screen.getByText('updateAvailable: 30')).toBeDefined();
    expect(screen.getByText('removed: 10')).toBeDefined();
  });

  it('has the correct structural elements', () => {
    const { container } = render(<DashboardContainer chartData={chartDataMock} />);
    const chartContainer = container.getElementsByClassName('pie-chart-container');
    expect(chartContainer).toBeDefined();
    const version = container.getElementsByClassName('version-eol');
    expect(version).toBeDefined();
    expect(screen.getByText('365')).toBeDefined(); // Checking if "365" is part of the rendered output
    expect(screen.getByText('Days Until Version EOL')).toBeDefined(); // Additional check for static text
  });
});
