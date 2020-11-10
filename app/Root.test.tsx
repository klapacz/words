import * as ReactDOM from 'react-dom';
import * as React from 'react';
import Root from './Root';

it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<Root menuData={[]} />, div);
});
