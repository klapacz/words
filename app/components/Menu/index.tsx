import * as React from 'react';

import MenuItem, { WordSetItem } from './MenuItem';

interface CategoryItem {
    name: string;
    wordSets: WordSetItem[];
}

type MenuData = CategoryItem[];

interface MenuProps {
    data: MenuData;
}

const Menu: React.FC<MenuProps> = ({ data: items }: MenuProps) => {
    return (
        <ul>
            {items.map(({ name: categoryName, wordSets }) => (
                <li key={categoryName}>
                    {categoryName}
                    <ol>
                        {wordSets.map((item) => (
                            <MenuItem item={item} key={item.name} />
                        ))}
                    </ol>
                </li>
            ))}
        </ul>
    );
};

export default Menu;
export { MenuData };
