import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { default as list } from '@/data/menu.json';

import Menu from './components/Menu';

const Root = () => (
    <div>
        <h1>Hello</h1>
        <Menu items={list} />
    </div>
);

ReactDOM.render(<Root />, document.getElementById('root'));
