import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './menu';
import wordSetsReducer from './wordSets';

const store = configureStore({
	reducer: {
		menu: menuReducer,
		wordSets: wordSetsReducer,
	},
});

store.subscribe(() => {
	window.localStorage.setItem('wordSets', JSON.stringify(store.getState().wordSets.wordSets));
});

export default store;

export type State = ReturnType<typeof store.getState>;
