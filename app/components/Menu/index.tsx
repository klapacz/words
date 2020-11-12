import { selectMenu } from '@root/app/store/menu';
import * as React from 'react';
import { useSelector } from 'react-redux';
import MenuCategory from './Category';

const Menu: React.FC = () => {
    const menu = useSelector(selectMenu);

    return (
        <nav>
            <ul>
                {menu.map((category) => (
                    <MenuCategory category={category} key={category.name} />
                ))}
            </ul>
        </nav>
    );
};

export default Menu;
