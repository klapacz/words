import { configureStore } from '@reduxjs/toolkit';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { validate } from 'jsonschema';
import wordSetSchema from '@root/data/word-set.schema.json';

import WordSetsReducer, { fetchWordSet, selectCurrentWord, selectWordSet } from './index';
import { waitFor } from '@testing-library/react';
import { setCurrentWordDone } from './actions';

export const fakeWordSet = {
	name: 'Fake Word Set',
	words: {
		one: 'jeden',
		two: 'dwa',
	},
};

const expectedWords = [
	{ original: 'one', translation: 'jeden' },
	{ original: 'two', translation: 'dwa' },
];
const expectedWordSet = {
	words: expectedWords,
	session: {
		words: expectedWords,
	},
};

type expectedWordSetType = typeof expectedWordSet & { session: { current: number } };

const { valid } = validate(fakeWordSet, wordSetSchema);

if (!valid) console.error('Bad fake word set data');

const server = setupServer(
	rest.get('/test-word-set', (req, res, ctx) => res(ctx.json(fakeWordSet)))
);

const store = configureStore({ reducer: { wordSets: WordSetsReducer } });
const state = store.getState();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.spyOn(window, 'fetch');

it('Correct initial state', () => {
	expect(state.wordSets).toMatchObject({});
});

it('Get data from API', async () => {
	store.dispatch(fetchWordSet('/test-word-set'));

	expect(store.getState().wordSets.wordSets['/test-word-set']).toEqual(undefined);

	expect(window.fetch).toHaveBeenCalled();

	let wordSet: expectedWordSetType;
	await waitFor(() => {
		wordSet = store.getState().wordSets.wordSets['/test-word-set'] as expectedWordSetType;

		expect(wordSet).not.toBeUndefined();
	});

	expect(wordSet).toMatchObject(expectedWordSet);
	expect(wordSet.session.current).toBeGreaterThanOrEqual(0);
	expect(wordSet.session.current).toBeLessThan(expectedWords.length);
});

it('test wordSetSelector selector', () => {
	expect(selectWordSet('/test-word-set')(store.getState())).toMatchObject(expectedWordSet);
});

it('test currentWord selector', () => {
	const { current } = store.getState().wordSets.wordSets['/test-word-set'].session;

	expect(selectCurrentWord('/test-word-set')(store.getState())).toMatchObject(
		expectedWords[current]
	);
});

it('test action', () => {
	store.dispatch(setCurrentWordDone('/test-word-set'));

	expect(store.getState().wordSets.wordSets['/test-word-set'].session.words.length).toEqual(
		expectedWords.length - 1
	);
});
