import * as React from 'react';
import { screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Menu from './index';
import { renderWithRouter } from '@root/tests/helpers';

jest.mock('@root/generated/menu.json', () => []);

afterEach(() => cleanup());

it('renders empty menu', () => {
    renderWithRouter(<Menu />);

    expect(screen.getByRole('list')).toBeInTheDocument();
});
