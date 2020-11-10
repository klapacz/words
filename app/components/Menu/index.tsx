import * as React from 'react';
import MenuEntity from '@/app/model/menu';
import MenuCategory from './Category';

interface Props {
    data: MenuEntity;
}

const Menu: React.FC<Props> = ({ data: items }: Props) => (
    <nav>
        <ul>
            {items.map((category) => (
                <MenuCategory category={category} key={category.name} />
            ))}
        </ul>
    </nav>
);

export default Menu;
