/**
* @jest-environment jsdom
*/

import { render, screen } from '@testing-library/react';
import React from 'react';
import Row from '../src/Row'

describe('test on Row component', () => {
    test('check if all components are rendered', () => {
        const { container } = render(<Row api='api' location='location' status='status' stable='stable' notes='notes'/>)
        const api = container.getElementsByClassName('api-info-api');
        expect(api).toBeDefined();
        const location = container.getElementsByClassName('api-info-location');
        expect(location).toBeDefined();
        const status = container.getElementsByClassName("api-info-status-status");
        expect(status).toBeDefined();
        const stable = container.getElementsByClassName("api-info-stable-version");
        expect(stable).toBeDefined();
        const version = container.getElementsByClassName('api-info-stable-version');
        expect(version).toBeDefined();
        const notes = container.getElementsByClassName('api-info-notes');
        expect(notes).toBeDefined();
    })

    test('render FaCheckCircle if props.status is stable', () => {
        const { container } = render(<Row api='api' location='location' status='stable' stable='stable' notes='notes'/>);
        const faCheckCircle = container.getElementsByClassName('icon-stable');
        expect(faCheckCircle).toBeDefined();
    });

    test('render IoIosWarning if props.status is deprecated', () => {
        const { container } = render(<Row api='api' location='location' status='deprecated' stable='stable' notes='notes' />);
        const ioIosWarning = container.getElementsByClassName('icon-deprecated');
        expect(ioIosWarning).toBeDefined();
    });

    test('render SiIfixit if props.status is removed', () => {
        const { container } = render(<Row api='api' location='location' status='removed' stable='stable' notes='notes' />);
        const siIfixit = container.getElementsByClassName('icon-deprecated');
        expect(siIfixit).toBeDefined();
    });
})