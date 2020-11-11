import * as React from 'react';
import { cleanup, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CategoryEntity, ItemEntity } from '@/model/menu';

import { renderWithRouter } from '@root/tests/helpers';

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

afterEach(() => cleanup());

it('renders category without items', () => {
    renderWithRouter(<Category category={category} />);

    const mainElement = screen.getByRole('listitem');

    expect(mainElement).toHaveTextContent(category.name);
});

it('renders items correctly', () => {
    category.items = items;

    renderWithRouter(<Category category={category} />);

    const itemsList = screen.getByRole('list');
    const listElements = within(itemsList).getAllByRole('listitem');

    expect(listElements.length).toEqual(2);
});
