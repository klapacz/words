import * as React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Menu from './index';

jest.mock('@root/generated/menu.json', () => []);

it('renders empty menu', () => {
    render(<Menu />);

    expect(screen.getByRole('list')).toBeInTheDocument();
});
