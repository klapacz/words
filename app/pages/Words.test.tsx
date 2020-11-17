import * as React from 'react';
import { cleanup, screen } from '@testing-library/react';
import { useSelector } from 'react-redux';

import { renderWithRouter } from '@root/tests/helpers';
import { PageData } from '@/store/menu';
import Words from './Words';
import { ResolverProps } from '@/components/wordSet/Show';

jest.mock('@/components/wordSet/Show', () =>
    jest
        .fn()
        .mockImplementation(({ pageData }: ResolverProps) => (
            <main>{pageData.wordSetMenuData.name}</main>
        ))
);

jest.mock('react-redux');

afterEach(() => cleanup());

it('renders correct page', () => {
    (useSelector as jest.Mock).mockImplementationOnce(
        (): PageData => ({
            category: {
                name: 'Category 1',
                items: [{ name: 'Unit 1', url: '/api/1/1.json' }],
            },
            wordSetMenuData: { name: 'Unit 1', url: '/api/1/1.json' },
        })
    );

    renderWithRouter(<Words />, '/category-1/unit-1', '/:category/:wordSet');

    expect(screen.getByRole('main')).toHaveTextContent(/unit 1/i);
});

it('renders 404', () => {
    (useSelector as jest.Mock).mockImplementationOnce(() => null);

    renderWithRouter(<Words />, '/category-1/unit-1', '/:category/:wordSet');

    expect(screen.getByRole('main')).toHaveTextContent(/404/i);
});
