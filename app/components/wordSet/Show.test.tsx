import * as React from 'react';
import { Provider } from 'react-redux';
import { cleanup, screen, render, fireEvent } from '@testing-library/react';
import store from '@/store';

import { rest } from 'msw';
import { setupServer } from 'msw/node';

import Show from './Show';
import { PageData } from '@/store/menu/index';
import { fakeWordSet } from '@/store/wordSets/index.test';

const server = setupServer(rest.get('/test', (req, res, ctx) => res(ctx.json(fakeWordSet))));

const wordSetMenuData = { name: 'Another Item', url: '/test-word-set' };
const props: PageData = {
	category: {
		name: 'Another Category',
		items: [wordSetMenuData],
	},
	wordSetMenuData,
};

beforeAll(() => server.listen());

beforeEach(() => (wordSetMenuData.name = Math.random().toString()));

afterEach(() => {
	cleanup();
	server.resetHandlers();
});
afterAll(() => server.close());

jest.spyOn(window, 'fetch');

it('test loading data', async () => {
	render(
		<Provider store={store}>
			<Show pageData={props} />
		</Provider>
	);

	expect(screen.getByText(/ładowanie/i)).toBeInTheDocument();
	expect(window.fetch).toHaveBeenCalled();

	const h2 = await screen.findByRole('heading', { level: 2 });
	const wordSetsState = store.getState().wordSets.wordSets['/test-word-set'];
	const { translation } = wordSetsState.session.words[wordSetsState.session.current];

	expect(h2).toHaveTextContent(new RegExp(translation, 'i'));
});

it('test end of words', async () => {
	render(
		<Provider store={store}>
			<Show pageData={props} />
		</Provider>
	);

	expect(window.fetch).toHaveBeenCalled();

	const input = await screen.getByLabelText(/Poprawne tłumaczenie/i);

	for (const [original] of Object.entries(fakeWordSet.words)) {
		fireEvent.change(input, {
			target: { value: original },
		});

		fireEvent.submit(input);
	}

	expect(screen.getByText(/koniec/i)).toBeInTheDocument();
});
