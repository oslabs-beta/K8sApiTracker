/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import RowHeader from '../src/RowHeader'

describe('Testing on RowHeader', () => {
    test('Test our RowHeader component', () => {
        // get our rowHeader from the screen
        const {container} = render(<RowHeader key={'row-header-key'} api='API' status='STATUS' 
        location='LOCATION' stable='STABLE VERSION' notes='NOTES' filters={['filter1', 'filter2']} 
        filter={()=> console.log('Filters invoked')}/>)
        // test that the header exists
        expect({container}).toBeDefined()
        // test it contains the api column header
        const apiHeader = screen.getByText('API')
        expect(apiHeader).toBeDefined();
        // test it contains the status column header
        const statusHeader = screen.getByText('STATUS')
        expect(statusHeader).toBeDefined();
        // test the status column header contains the filter component
        const filterDropdown = container.getElementsByClassName('filter-dropdown');
        expect(filterDropdown).toBeDefined();
        // test it contains the location column header
        const locationHeader = screen.getByText('LOCATION')
        expect(locationHeader).toBeDefined();
        // test it contains the stable Version column header
        const versionHeader = screen.getByText('STABLE VERSION')
        expect(versionHeader).toBeDefined();
        // test it contains the notes column header
        const notesHeader = screen.getByText('NOTES')
        expect(notesHeader).toBeDefined();
        // test it contains the filters Array? these may not be necessary
        // test it contains the filter function? these may not be necessary
    });
})