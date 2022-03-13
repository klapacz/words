import { createSlice } from '@reduxjs/toolkit';
import { default as menuData } from '@root/generated/menu.json';
import { MenuSchema } from '@root/scripts/schemas';
import { MenuState } from './types';

const initialState: MenuState = {
	menu: menuData as MenuSchema,
};

export const slice = createSlice({
	name: 'menu',
	initialState,
	reducers: {},
});

export * from './selectors';

export default slice.reducer;
