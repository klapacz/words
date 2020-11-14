import { createSlice } from '@reduxjs/toolkit';
import { default as menuData } from '@root/generated/menu.json';
import { MenuState } from './types';

const initialState: MenuState = {
    menu: menuData,
};

export const slice = createSlice({
    name: 'menu',
    initialState,
    reducers: {},
});

export * from './selectors';

export default slice.reducer;
