import * as React from 'react';
import MenuCategory from './Category';

import { default as menuData } from '@root/generated/menu.json';

const Menu: React.FC = () => (
    <nav>
        <ul>
            {menuData.map((category) => (
                <MenuCategory category={category} key={category.name} />
            ))}
        </ul>
    </nav>
);

export default Menu;
