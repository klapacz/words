import * as React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Root from './Root';

it('renders home', () => {
    window.history.pushState({}, 'Home Page', '/');

    render(<Root />);

    expect(screen.getByRole('main')).toBeInTheDocument();
});
