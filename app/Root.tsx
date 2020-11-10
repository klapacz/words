import * as React from 'react';

import Menu, { MenuData } from './components/Menu';

interface RootProps {
    menuData: MenuData;
}

const Root: React.FC<RootProps> = ({ menuData }: RootProps) => (
    <div>
        <h1>Hello</h1>
        <Menu data={menuData} />
    </div>
);

export default Root;
