import { createSelector } from 'reselect';
import { State } from '..';
import { Category, MenuState, WordSet } from './types';

import { serializeToURL } from '@root/src/helpers';

export const selectMenu = (state: State): MenuState['menu'] => state.menu.menu;

export interface PageData {
	category: Category;
	wordSetMenuData: WordSet;
}

export const selectBy = (serializedCategoryName: string, serializedWordSetName: string) =>
	createSelector([selectMenu], (menu) => {
		for (const category of menu) {
			if (serializeToURL(category.name) !== serializedCategoryName) {
				continue;
			}

			for (const wordSetMenuData of category.items) {
				if (serializeToURL(wordSetMenuData.name) !== serializedWordSetName) {
					continue;
				}
				return { category, wordSetMenuData } as PageData;
			}
			return null;
		}
		return null;
	});
