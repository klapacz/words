import * as React from 'react';
import { cleanup, screen } from '@testing-library/react';

import { renderWithRouter } from '@root/tests/helpers';
import Words from './Words';

afterEach(() => cleanup());

it('renders', () => {
    const route = '/english/unit1';
    renderWithRouter(<Words />, route, '/:category/:wordSet');

    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveTextContent(route);
});
