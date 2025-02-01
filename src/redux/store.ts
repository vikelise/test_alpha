// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import recipesReducer from '../api/recipesSlice';
import imageReducer from './imageSlice';
import ingredientsReducer from './ingredientsSlice';

const store = configureStore({
    reducer: {
        recipes: recipesReducer,
        image: imageReducer,
        ingredients: ingredientsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
