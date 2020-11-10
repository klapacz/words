import * as React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Item from './Item';

const item = {
    name: 'Item',
    url: '/url',
};

it('renders MenuItem correctly', () => {
    render(<Item item={item} />);

    const linkElement = screen.getByRole('link');

    expect(linkElement).toHaveTextContent(item.name);
    expect(linkElement).toHaveAttribute('href', item.url);
});
