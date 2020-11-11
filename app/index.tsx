import * as ReactDOM from 'react-dom';
import * as React from 'react';
import Root from './Root';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <Root />
    </BrowserRouter>,
    document.getElementById('root')
);
