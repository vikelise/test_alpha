// components/RecipeList.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes } from '../api/recipesSlice';
import { RootState, AppDispatch } from '../redux/store'; // Импортируйте типы

const RecipeList: React.FC = () => {
    const dispatch: AppDispatch = useDispatch(); // Типизация dispatch позволяет  проверять, что мы отправляем правильные действия.
    const { recipes, loading, error } = useSelector((state: RootState) => state.recipes); // Типизация состояния Извлекает состояние рецептов из Redux.

    //Этот хук выполняется после первого рендера компонента.
    //инициирует запрос на получение рецептов с заданными ID.
    useEffect(() => {
        // Замените на ваши ID рецептов
        dispatch(fetchRecipes());
    }, [dispatch]);//dispatch передан в массив зависимостей, чтобы избежать предупреждений о зависимостях и гарантировать, что эффект будет выполнен только один раз при монтировании компонента.


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Recipes</h2>
            <ul>
                {recipes.map((recipe: any) => (
                    <li key={recipe.id}>{recipe.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeList;
