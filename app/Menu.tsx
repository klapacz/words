import * as React from 'react';

interface WordSetItem {
    name: string;
    url: string;
}

interface CategoryItem {
    name: string;
    wordSets: WordSetItem[];
}

interface MenuItemProps {
    item: WordSetItem;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }: MenuItemProps) => {
    return (
        <li key={item.name}>
            <a href={item.url}>{item.name}</a>
        </li>
    );
};

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
