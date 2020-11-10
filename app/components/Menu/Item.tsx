import * as React from 'react';

export interface WordSetItem {
    name: string;
    url: string;
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

export default MenuItem;
