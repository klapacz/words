import { configureStore } from '@reduxjs/toolkit';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { validate } from 'jsonschema';
import wordSetSchema from '@root/data/word-set.schema.json';

import WordSetsReducer, { fetchWordSet, selectWordSet } from './index';
import { waitFor } from '@testing-library/react';

export const fakeWordSet = {
    name: 'Fake Word Set',
    words: {
        original: 'test',
    },
};

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

it('test selector', () => {
    expect(selectWordSet('/some-word-set')(state)).toEqual(undefined);
});

it('Get data from API', async () => {
    store.dispatch(fetchWordSet('/test-word-set'));

    expect(store.getState().wordSets.wordSets['/test-word-set']).toEqual(
        undefined
    );

    expect(window.fetch).toHaveBeenCalled();

    await waitFor(() =>
        expect(
            store.getState().wordSets.wordSets['/test-word-set']
        ).toMatchObject({
            words: fakeWordSet.words,
        })
    );
});
