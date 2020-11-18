import * as React from 'react';
import { Provider } from 'react-redux';
import { cleanup, screen, render, fireEvent } from '@testing-library/react';

import { rest } from 'msw';
import { setupServer } from 'msw/node';

import menuReducer from '@/store/menu/index';
import wordSetsReducer from '@/store/wordSets/index';

import Show from './Show';
import { PageData } from '@/store/menu/index';
import { fakeWordSet } from '@/store/wordSets/index.test';
import { configureStore, Store } from '@reduxjs/toolkit';

const server = setupServer(rest.get('/test', (req, res, ctx) => res(ctx.json(fakeWordSet))));
let store: Store;

const wordSetMenuData = { name: 'Another Item', url: '/test-word-set' };
const props: PageData = {
	category: {
		name: 'Another Category',
		items: [wordSetMenuData],
	},
	wordSetMenuData,
};

beforeAll(() => server.listen());

beforeEach(() => {
	wordSetMenuData.name = Math.random().toString();

	store = configureStore({
		reducer: {
			menu: menuReducer,
			wordSets: wordSetsReducer,
		},
	});
});

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

	const stats = screen.getByText(/ukończono/i);
	expect(stats).toHaveTextContent(new RegExp(`0/${wordSetsState.words.length}`, 'i'));
});

it('stats and words are changing', async () => {
	render(
		<Provider store={store}>
			<Show pageData={props} />
		</Provider>
	);

	expect(window.fetch).toHaveBeenCalled();
	await screen.findByRole('heading', { level: 2 });

	const input = await screen.getByLabelText(/Poprawne tłumaczenie/i);
	let wordSetsState = store.getState().wordSets.wordSets['/test-word-set'];
	const { original } = wordSetsState.session.words[wordSetsState.session.current];

	fireEvent.change(input, {
		target: { value: original },
	});

	fireEvent.submit(input);

	wordSetsState = store.getState().wordSets.wordSets['/test-word-set'];
	const stats = screen.getByText(/ukończono/i);
	expect(stats).toHaveTextContent(new RegExp(`1/${wordSetsState.words.length}`, 'i'));
});

it('test end of words', async () => {
	render(
		<Provider store={store}>
			<Show pageData={props} />
		</Provider>
	);

	expect(window.fetch).toHaveBeenCalled();

	const input = await screen.findByLabelText(/Poprawne tłumaczenie/i);
	const h2 = screen.getByRole('heading', { level: 2 });

	for (let i = 0; i < Object.entries(fakeWordSet.words).length; i++) {
		const [, translationToFind] = h2.textContent.match(/„(.+)”/i);

		const original = Object.entries(fakeWordSet.words).find(
			([, translation]) => translation.trim() === translationToFind.trim()
		)[0];

		fireEvent.change(input, {
			target: { value: original },
		});

		fireEvent.submit(input);
	}

	expect(screen.getByText(/koniec/i)).toBeInTheDocument();
});

it('test restart when wordSet complete', async () => {
	render(
		<Provider store={store}>
			<Show pageData={props} />
		</Provider>
	);

	expect(window.fetch).toHaveBeenCalled();

	const input = await screen.findByLabelText(/Poprawne tłumaczenie/i);
	const h2 = screen.getByRole('heading', { level: 2 });

	for (let i = 0; i < Object.entries(fakeWordSet.words).length; i++) {
		const [, translationToFind] = h2.textContent.match(/„(.+)”/i);

		const original = Object.entries(fakeWordSet.words).find(
			([, translation]) => translation.trim() === translationToFind.trim()
		)[0];

		fireEvent.change(input, {
			target: { value: original },
		});

		fireEvent.submit(input);
	}

	const resetButton = screen.getByText(/reset/i);
	expect(resetButton).toBeInTheDocument();
	expect(() => screen.getByRole('heading', { level: 2 })).toThrow();

	fireEvent.click(resetButton);
	expect(window.fetch).toHaveBeenCalled();
	expect(await screen.findByRole('heading', { level: 2 })).toBeInTheDocument();
});

it('resets while in wordSet', async () => {
	render(
		<Provider store={store}>
			<Show pageData={props} />
		</Provider>
	);

	expect(window.fetch).toHaveBeenCalled();

	await screen.findByRole('heading', { level: 2 });
	const resetButton = screen.getByText(/reset/i);

	fireEvent.click(resetButton);
	expect(window.fetch).toHaveBeenCalled();
	expect(await screen.findByRole('heading', { level: 2 })).toBeInTheDocument();
});

it('render correctly on wrong input', async () => {
	render(
		<Provider store={store}>
			<Show pageData={props} />
		</Provider>
	);

	expect(window.fetch).toHaveBeenCalled();

	const input = await screen.findByLabelText(/Poprawne tłumaczenie/i);
	const h2 = screen.getByRole('heading', { level: 2 });

	const [, translationToFind] = h2.textContent.match(/„(.+)”/i);

	const original = Object.entries(fakeWordSet.words).find(
		([, translation]) => translation.trim() === translationToFind.trim()
	)[0];

	fireEvent.change(input, {
		target: { value: 'wrong input' },
	});

	fireEvent.submit(input);

	expect(screen.getByText(/błąd/i)).toHaveTextContent(new RegExp(original));

	for (let i = 3; i > 0; i--) {
		expect(h2).toHaveTextContent(new RegExp(i.toString()));

		fireEvent.change(input, {
			target: { value: original },
		});

		fireEvent.submit(input);
	}

	expect(() => screen.getByText(/błąd/i)).toThrow();
});
