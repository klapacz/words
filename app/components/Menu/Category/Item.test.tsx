import * as React from 'react';
import { screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { renderWithRouter } from '@root/tests/helpers';
import Item from './Item';

const item = {
    name: 'Item',
    url: '/url',
};

afterEach(() => cleanup());

it('renders MenuItem correctly', () => {
    const { history } = renderWithRouter(<Item item={item} />);

    const linkElement = screen.getByRole('link');

    expect(linkElement).toHaveTextContent(item.name);
    expect(linkElement).toHaveAttribute('href', item.url);

    fireEvent.click(linkElement);

    expect(history.location.pathname).toBe(item.url);
});
