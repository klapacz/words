import * as React from 'react';
import { cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { renderWithRouter } from '@root/tests/helpers';
import Root from './Root';

jest.mock('./pages/Home', () => jest.fn().mockReturnValue(<nav></nav>));
jest.mock('./pages/Words', () => jest.fn().mockReturnValue(<main></main>));

afterEach(() => cleanup());

it('renders home', () => {
	renderWithRouter(<Root />);

	expect(screen.getByRole('navigation')).toBeInTheDocument();
});

it('renders another', () => {
	renderWithRouter(<Root />, '/test');

	expect(() => screen.getByRole('navigation', {})).toThrow();
});
