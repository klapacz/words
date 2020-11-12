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

export const selectBy = (
    serializedCategoryName: string,
    serializedWordSetName: string
): OutputSelector<
    State,
    [Category, WordSet],
    (menu: MenuState['menu']) => [Category, WordSet]
> =>
    createSelector([selectMenu], (menu) => {
        for (const category of menu) {
            if (serializeToURL(category.name) !== serializedCategoryName) {
                continue;
            }

            for (const wordSet of category.items) {
                if (serializeToURL(wordSet.name) !== serializedWordSetName) {
                    continue;
                }

                return [category, wordSet];
            }

            return null;
        }

        return null;
    });

export default slice.reducer;
