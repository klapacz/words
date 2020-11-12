import * as React from 'react';
import { Link } from 'react-router-dom';
import { WordSet } from '@/store/menu/types';

interface Props {
    item: WordSet;
}

const CategoryItem: React.FC<Props> = ({ item }: Props) => {
    return (
        <li>
            <Link to={item.url}>{item.name}</Link>
        </li>
    );
};

export default CategoryItem;
