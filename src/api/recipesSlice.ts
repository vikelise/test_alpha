import { createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';

export interface Recipe {
    id: number;
    title: string;
    image: string;
    readyInMinutes: number;
    cookingMinutes: number;
    pricePerServing:  number | string;
    summary: string;
    vegan: boolean;
    vegetarian: boolean;
    glutenFree: boolean;
    dairyFree: boolean;
    veryHealthy: boolean;
    cheap: boolean;
    veryPopular: boolean;
    sustainable: boolean;
    lowFodmap: boolean;
    weightWatcherSmartPoints: number | string;
    healthScore: number | string;
    liked: boolean;
    servings: number | string;
    extendedIngredients: object;
    instructions: string;
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
            number: 20,
            offset: 0,
        },
    });

    return response.data.results;
});

// Новый thunk для получения информации о рецепте
export const fetchRecipeDetails = createAsyncThunk('recipes/fetchRecipeDetails', async (id: number) => {
    const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
        params: {
            apiKey: '95b7951b349848d989f4113c875b481a', // Замените на ваш API ключ
        },
    });
    return response.data;
});

const recipesSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        addRecipe: (state, action: PayloadAction<Recipe>) => {
            state.recipes.push(action.payload);
        },
        removeRecipe: (state, action: PayloadAction<number>) => {
            state.recipes = state.recipes.filter(recipe => recipe.id !== action.payload);
        },
        toggleLike(state, action: PayloadAction<number>) {
            const recipe = state.recipes.find(r => r.id === action.payload);
            if (recipe) {
                recipe.liked = !recipe.liked; // Переключаем состояние "нравится"
            }
        },
    },
    //синхронные редьюсеры удаление добавление
    extraReducers: (builder) => {
        //обработчики ассинхронного действия
        builder//это объект, который предоставляет методы для добавления обработчиков действий (reducers) в секции extraReducers
            .addCase(fetchRecipes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRecipes.fulfilled, (state, action) => {
                state.loading = false;
                const existingIds = new Set(state.recipes.map(recipe => recipe.id));
                const newRecipes = action.payload.filter((recipe: Recipe) => !existingIds.has(recipe.id));
                state.recipes = [...state.recipes, ...newRecipes];
            })
            .addCase(fetchRecipes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch recipes';
            })
            .addCase(fetchRecipeDetails.fulfilled, (state, action) => {
                const index = state.recipes.findIndex(recipe => recipe.id === action.payload.id);
                if (index !== -1) {
                    // Обновляем существующий рецепт с новыми деталями
                    state.recipes[index] = { ...state.recipes[index], ...action.payload };
                }
            });
    },
});

export const { addRecipe } = recipesSlice.actions;
export const { removeRecipe } = recipesSlice.actions;
export const { toggleLike } = recipesSlice.actions;

//В конце мы экспортируем редьюсер, чтобы его можно было использовать в настройках Redux Store.
export default recipesSlice.reducer;
