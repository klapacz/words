import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './menu';

const store = configureStore({
    reducer: {
        menu: menuReducer,
    },
});

export default store;

export type State = ReturnType<typeof store.getState>;
