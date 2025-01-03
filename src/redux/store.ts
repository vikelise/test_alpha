// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import recipesReducer from '../api/recipesSlice';

// Создание Redux store
const store = configureStore({
    reducer: {
        recipes: recipesReducer,
    },
});

// Типизация состояния и dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
