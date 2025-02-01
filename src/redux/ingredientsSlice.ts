// ingredientsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Ingredient {
    nameClean: string;
    amount: number;
    unit: string;
}

interface IngredientsState {
    ingredients: Ingredient[];
}

const initialState: IngredientsState = {
    ingredients: [],
};

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        addIngredient(state, action: PayloadAction<Ingredient>) {
            state.ingredients.push(action.payload);
        },
    },
});

export const { addIngredient } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
