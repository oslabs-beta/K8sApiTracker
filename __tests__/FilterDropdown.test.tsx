/**
 * @jest-environment jsdom
 */

import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import FilterDropdown from '../src/FilterDropdown'

describe('Testing on FilterDropdown', () => {
    test('Test our FilterDropdown component', () => {
        // create a mock function to pass into the filter prop
        const mockFilterFunction = jest.fn()
        //create our filterdropdown component
        const { container } = render(<FilterDropdown  filters={['filter1', 'filter2']} filter={mockFilterFunction}/>);
        // should have a button to drop down the dropdown
        const filterButton = container.getElementsByClassName('filter-button')
        expect(filterButton).toBeDefined()
        // when clicked, the dropdown should drop down with three checkboxes
        fireEvent.click(filterButton[0])
        let checkBoxes = container.getElementsByClassName('filter-checkbox')
        const stableCheckBox = checkBoxes[0];
        expect(stableCheckBox).toBeDefined()
        const updateAvailableCheckBox = checkBoxes[1];
        expect(updateAvailableCheckBox).toBeDefined()
        const removedCheckBox = checkBoxes[2];
        expect(removedCheckBox).toBeDefined()
        // clicking the checkboxes should change the box status (not yet the state)
        fireEvent.click(stableCheckBox);
        fireEvent.click(updateAvailableCheckBox);
        fireEvent.click(removedCheckBox);
        // the change of the box status should invoke the callback function (three times, one for each of the clicks above)
        expect(mockFilterFunction).toHaveBeenCalledTimes(3);
        // when clicked again, the dropdown should close, and the elements should no longer be there
        fireEvent.click(filterButton[0])
        checkBoxes = container.getElementsByClassName('filter-checkbox');
        expect(checkBoxes[0]).toBeUndefined()
    });
})