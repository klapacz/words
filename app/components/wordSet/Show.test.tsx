import * as React from 'react';
import { Provider } from 'react-redux';
import { cleanup, screen, render } from '@testing-library/react';
import store from '@/store';

import { rest } from 'msw';
import { setupServer } from 'msw/node';

import Show, { Props } from './Show';
import { fakeWordSet } from '@/store/wordSets/index.test';

const server = setupServer(
    rest.get('/test', (req, res, ctx) => res(ctx.json(fakeWordSet)))
);

const wordSet = { name: 'Another Item', url: '/test' };
const props: Props['pageData'] = {
    category: {
        name: 'Another Category',
        items: [wordSet],
    },
    wordSet,
};

beforeAll(() => server.listen());

beforeEach(() => (wordSet.name = Math.random().toString()));

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
    expect(await screen.findByText(/\{.+\}/i)).toBeInTheDocument();
});

jest.setTimeout(30000);
