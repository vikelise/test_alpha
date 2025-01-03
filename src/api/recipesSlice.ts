import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Recipe {
    id: number;
    title: string;
    // добавьте другие необходимые поля
    //интерфейс  объекта рецепта
}

interface RecipesState {
    recipes: Recipe[]; //масисв рецептов
    loading: boolean; //загрузка данных
    error: string | null; // строка которая хранит сообщение об ошибке либо ничего
    //интерфейс слайса рецептов
}

const initialState: RecipesState = {
    recipes: [],
    loading: false,
    error: null,
    //задаем начальное состояние
};

// Асинхронный thunk для получения данных о рецептах
export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async () => {
    const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
        params: {
            apiKey: '95b7951b349848d989f4113c875b481a', // Замените на ваш API ключ
            number: 100,
            offset: 0,
        },
    });
    return response.data.results;
});

const recipesSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {}, //синхронные редьюсеры удаление добавление
    extraReducers: (builder) => {
        //обработчики ассинхронного действия
        builder//это объект, который предоставляет методы для добавления обработчиков действий (reducers) в секции extraReducers
            .addCase(fetchRecipes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRecipes.fulfilled, (state, action) => {
                state.loading = false;
                state.recipes = action.payload;
            })
            .addCase(fetchRecipes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch recipes';
            });
    },
});
//В конце мы экспортируем редьюсер, чтобы его можно было использовать в настройках Redux Store.
export default recipesSlice.reducer;
