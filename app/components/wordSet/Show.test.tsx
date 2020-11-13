import * as React from 'react';
import { cleanup, screen, render } from '@testing-library/react';

import { rest } from 'msw';
import { setupServer } from 'msw/node';

import Show from './Show';
import { Props } from '@/components/wordSet/Show';

const server = setupServer(
    rest.get('/test', (req, res, ctx) =>
        res(ctx.delay(1000), ctx.json({ test: 'test' }))
    )
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
    render(<Show pageData={props} />);

    expect(window.fetch).toHaveBeenCalled();

    expect(
        await screen.findByText(/\{.+\}/i, {}, { timeout: 30000 })
    ).toBeInTheDocument();
});

jest.spyOn(console, 'error').mockImplementation();

it('test fail', async () => {
    wordSet.url = 'not-existing';
    render(<Show pageData={props} />);

    expect(screen.getByText('Ładowanie…')).toBeInTheDocument();
    expect(window.fetch).toHaveBeenCalled();

    const alert = await screen.findByRole(
        'alert',
        {},
        {
            timeout: 30000,
        }
    );

    expect(console.error).toHaveBeenCalled();
    expect(alert).toHaveTextContent('Błąd pobierania danych');
});

jest.setTimeout(30000);
