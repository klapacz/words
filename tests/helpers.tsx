import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { Route, Router } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory } from 'history';

export function renderWithRouter(
    component: React.ReactNode,
    route = '/',
    path?: string
): RenderResult & { history: MemoryHistory } {
    const history = createMemoryHistory({ initialEntries: [route] });

    return {
        history,
        ...render(
            <Router history={history}>
                <Route path={path || route}>{component}</Route>
            </Router>
        ),
    };
}
