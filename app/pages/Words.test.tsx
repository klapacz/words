import * as React from 'react';
import { cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { renderWithRouter } from '@root/tests/helpers';
import Words from './Words';

afterEach(() => cleanup());

it('renders', () => {
    const name = 'test-name';
    renderWithRouter(<Words />, `/${name}`, '/:name');

    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveTextContent(name);
});
