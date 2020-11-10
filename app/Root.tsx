import * as React from 'react';
import { default as list } from '@/generated/menu.json';

import Menu from './components/Menu';

const Root: React.FC = () => (
    <div>
        <h1>Hello</h1>
        <Menu items={list} />
    </div>
);

export default Root;