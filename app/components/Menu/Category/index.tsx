import * as React from 'react';
import { Category } from '@/store/menu/types';
import Item from './Item';

interface Props {
    category: Category;
}

const Category: React.FC<Props> = ({ category }: Props) => (
    <li>
        {category.name}
        <ol>
            {category.items.map((item) => (
                <Item item={item} key={item.name} />
            ))}
        </ol>
    </li>
);
export default Category;
