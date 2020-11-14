import { configureStore } from '@reduxjs/toolkit';
import menu, { selectBy, selectMenu } from './index';

jest.mock('@root/generated/menu.json', () => [
    { name: 'Category 1', items: [{ name: 'First', url: '/first' }] },
]);

const store = configureStore({ reducer: { menu } });
const state = store.getState();

it('sets correct state', () => {
    expect(state.menu).toMatchObject({
        menu: [
            { name: 'Category 1', items: [{ name: 'First', url: '/first' }] },
        ],
    });
});

describe('SelectMenu', () => {
    it('return correct value', () => {
        expect(selectMenu(state)).toMatchObject([
            { name: 'Category 1', items: [{ name: 'First', url: '/first' }] },
        ]);
    });
});

describe('selectBy selector test', () => {
    it('selects correct element', () => {
        expect(selectBy('category-1', 'first')(state)).toMatchObject({
            category: {
                name: 'Category 1',
                items: [{ name: 'First', url: '/first' }],
            },
            wordSetMenuData: { name: 'First', url: '/first' },
        });
    });
});
