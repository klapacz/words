import * as React from 'react';

import MenuItem, { WordSetItem } from './MenuItem';

interface CategoryItem {
    name: string;
    wordSets: WordSetItem[];
}

interface MenuProps {
    items: CategoryItem[];
}

const Menu: React.FC<MenuProps> = ({ items }: MenuProps) => {
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