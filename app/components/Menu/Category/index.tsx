import * as React from 'react';
import { CategoryEntity } from '@/model/menu';
import Item from './Item';

interface Props {
    category: CategoryEntity;
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
