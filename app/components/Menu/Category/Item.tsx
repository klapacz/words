import * as React from 'react';
import { ItemEntity } from '@/app/model/menu';

interface Props {
    item: ItemEntity;
}

const CategoryItem: React.FC<Props> = ({ item }: Props) => {
    return (
        <li>
            <a href={item.url}>{item.name}</a>
        </li>
    );
};

export default CategoryItem;
