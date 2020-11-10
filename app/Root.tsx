import * as React from 'react';

import Menu from './components/Menu';
import MenuEntity from '@/app/model/menu';

interface RootProps {
    menuData: MenuEntity;
}

const Root: React.FC<RootProps> = ({ menuData }: RootProps) => (
    <div>
        <h1>Hello</h1>
        <Menu data={menuData} />
    </div>
);

export default Root;
