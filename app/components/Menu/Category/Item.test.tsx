import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from 'history';

import Item from './Item';

const item = {
    name: 'Item',
    url: '/url',
};

it('renders MenuItem correctly', () => {
    const history = createMemoryHistory();

    render(
        <Router history={history}>
            <Item item={item} />
        </Router>
    );

    const linkElement = screen.getByRole('link');

    expect(linkElement).toHaveTextContent(item.name);
    expect(linkElement).toHaveAttribute('href', item.url);

    fireEvent.click(linkElement);

    expect(history.location.pathname).toBe(item.url);
});
