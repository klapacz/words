import { configureStore } from '@reduxjs/toolkit';
import menu, { selectMenu } from './index';

jest.mock('@root/generated/menu.json', () => []);

const store = configureStore({ reducer: { menu } });
const state = store.getState();

it('sets correct state', () => {
    expect(state.menu).toStrictEqual({ menu: [] });
});

describe('SelectMenu', () => {
    it('return correct value', () => {
        expect(selectMenu(state)).toStrictEqual([]);
    });
});
