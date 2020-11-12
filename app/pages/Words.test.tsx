import * as React from 'react';
import { cleanup, screen } from '@testing-library/react';

import { renderWithRouter } from '@root/tests/helpers';
import Words from './Words';

afterEach(() => cleanup());

jest.mock('react-redux', () => ({
    useSelector: jest
        .fn()
        .mockReturnValueOnce([
            {
                name: 'Category 1',
                items: { name: 'Unit 1', url: '/api/1/1.json' },
            },
            { name: 'Unit 1', url: '/api/1/1.json' },
        ])
        .mockReturnValueOnce(null),
}));

it('renders correct page', () => {
    const route = '/category-1/unit-1';
    renderWithRouter(<Words />, route, '/:category/:wordSet');

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Unit 1'
    );
});

it('renders 404', () => {
    const route = '/category-1/unit-1';
    renderWithRouter(<Words />, route, '/:category/:wordSet');

    expect(screen.getByRole('main')).toHaveTextContent('404');
});
