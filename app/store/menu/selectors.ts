import { createSelector, OutputSelector } from 'reselect';
import { State } from '..';
import { Category, MenuState, WordSet } from './types';

import { serializeToURL } from '@root/app/helpers';

export const selectMenu = (state: Partial<State>): MenuState['menu'] =>
    state.menu.menu;

export interface SelectByOutputSelectorReturn {
    category: Category;
    wordSet: WordSet;
}

export type SelectByOutputSelector = OutputSelector<
    Partial<State>,
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
