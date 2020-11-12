import * as React from 'react';
import { Category } from '@/store/menu/types';
import { Link } from 'react-router-dom';
import { serializeToURL } from '@root/app/helpers';

interface Props {
    category: Category;
}

const Category: React.FC<Props> = ({ category }: Props) => (
    <li>
        {category.name}
        <ol>
            {category.items.map((item) => (
                <li key={item.name}>
                    <Link to={serializeToURL(`/${category.name}/${item.name}`)}>
                        {item.name}
                    </Link>
                </li>
            ))}
        </ol>
    </li>
);
export default Category;
