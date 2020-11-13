import { createSlice } from '@reduxjs/toolkit';
import { createSelector, OutputSelector } from 'reselect';

import { default as menuData } from '@root/generated/menu.json';
import { State } from '..';
import { Category, MenuState, WordSet } from './types';
import { serializeToURL } from '@root/app/helpers';

const initialState: MenuState = {
    menu: menuData,
};

export const slice = createSlice({
    name: 'menu',
    initialState,
    reducers: {},
});

export const selectMenu = (state: State): MenuState['menu'] => state.menu.menu;

export interface SelectByOutputSelectorReturn {
    category: Category;
    wordSet: WordSet;
}

export type SelectByOutputSelector = OutputSelector<
    State,
    SelectByOutputSelectorReturn,
    (menu: MenuState['menu']) => SelectByOutputSelectorReturn
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

            for (const wordSet of category.items) {
                if (serializeToURL(wordSet.name) !== serializedWordSetName) {
                    continue;
                }

                return { category, wordSet };
            }

            return null;
        }

        return null;
    });

export default slice.reducer;
