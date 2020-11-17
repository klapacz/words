import { createSelector, OutputSelector } from 'reselect';
import { State } from '..';
import { Category, MenuState, WordSet } from './types';

import { serializeToURL } from '@root/app/helpers';

export const selectMenu = (state: Partial<State>): MenuState['menu'] => state.menu.menu;

export interface PageData {
	category: Category;
	wordSetMenuData: WordSet;
}

export type SelectByOutputSelector = OutputSelector<
	Partial<State>,
	PageData,
	(menu: MenuState['menu']) => PageData
>;

export const selectBy = (
	serializedCategoryName: string,
	serializedWordSetName: string
): SelectByOutputSelector =>
	createSelector([selectMenu], (menu) => {
		for (const category of menu) {
			if (serializeToURL(category.name) !== serializedCategoryName) {
				continue;
			}

			for (const wordSetMenuData of category.items) {
				if (serializeToURL(wordSetMenuData.name) !== serializedWordSetName) {
					continue;
				}

				return { category, wordSetMenuData };
			}

			return null;
		}

		return null;
	});
