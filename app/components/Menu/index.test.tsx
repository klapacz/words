import * as React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Menu from './index';

it('renders empty menu', () => {
    render(<Menu data={[]} />);

    expect(screen.getByRole('list')).toBeInTheDocument();
});
