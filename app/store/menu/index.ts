import { createSlice } from '@reduxjs/toolkit';
import { default as menuData } from '@root/generated/menu.json';
import { State } from '..';
import { MenuState } from './types';

const initialState: MenuState = {
    menu: menuData,
};

export const slice = createSlice({
    name: 'menu',
    initialState,
    reducers: {},
});

export const selectMenu = (state: State): MenuState['menu'] => state.menu.menu;

export default slice.reducer;
