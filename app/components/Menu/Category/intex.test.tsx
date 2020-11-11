import * as React from 'react';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import { CategoryEntity, ItemEntity } from '@/model/menu';

import Category from './index';

const category: CategoryEntity = {
    name: 'Super Category',
    items: [],
};

const items: ItemEntity[] = [
    {
        name: 'First',
        url: '/first',
    },
    {
        name: 'Second',
        url: '/second',
    },
];

it('renders category without items', () => {
    render(<Category category={category} />, { wrapper: MemoryRouter });

    const mainElement = screen.getByRole('listitem');

    expect(mainElement).toHaveTextContent(category.name);
});

it('renders items correctly', () => {
    category.items = items;

    render(<Category category={category} />, { wrapper: MemoryRouter });

    const itemsList = screen.getByRole('list');
    const listElements = within(itemsList).getAllByRole('listitem');

    expect(listElements.length).toEqual(2);
});
