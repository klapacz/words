import * as React from 'react';
import { screen, cleanup } from '@testing-library/react';

import Menu from './index';
import { renderWithRouter } from '@root/tests/helpers';

afterEach(() => cleanup());

jest.mock('react-redux', () => ({
	useSelector: jest.fn().mockReturnValue([]),
}));

it('renders empty menu', () => {
	renderWithRouter(<Menu />);

	expect(screen.getByRole('list')).toBeInTheDocument();
});
