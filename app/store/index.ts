import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './menu';
import wordSetsReducer from './wordSets';

const store = configureStore({
    reducer: {
        menu: menuReducer,
        wordSets: wordSetsReducer,
    },
});

export default store;

export type State = ReturnType<typeof store.getState>;
