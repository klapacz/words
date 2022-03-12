import * as React from 'react';
import { Category } from '@root/src/store/menu/types';
import { Link } from 'react-router-dom';
import { serializeToURL } from '@root/src/helpers';
import { MenuItem, SubMenu, SubMenuItem } from '@root/src/styled';

interface Props {
	category: Category;
}

const Category: React.FC<Props> = ({ category }: Props) => (
	<MenuItem>
		{category.name}
		<SubMenu>
			{category.items.map((item) => (
				<SubMenuItem key={item.name}>
					<Link to={serializeToURL(`/${category.name}/${item.name}`)}>{item.name}</Link>
				</SubMenuItem>
			))}
		</SubMenu>
	</MenuItem>
);
export default Category;
