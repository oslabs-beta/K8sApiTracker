/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import ScanButton from '../src/ScanButton';

describe('Test on scan buttons', () => {
    test('should render scan button', () => {
      const handleClick = jest.fn();
      const { container } = render(<ScanButton id={1} text='text' onClick={() => handleClick()} isLoading={true} />);
      const scanButton = container.getElementsByClassName('scanButton');
      expect(scanButton).toBeDefined();
    });
});