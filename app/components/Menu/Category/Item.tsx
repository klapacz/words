import * as React from 'react';
import { Link } from 'react-router-dom';
import { ItemEntity } from '@/model/menu';

interface Props {
    item: ItemEntity;
}

const CategoryItem: React.FC<Props> = ({ item }: Props) => {
    return (
        <li>
            <Link to={item.url}>{item.name}</Link>
        </li>
    );
};

export default CategoryItem;
