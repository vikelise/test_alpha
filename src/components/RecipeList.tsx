// components/RecipeList.tsx

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes } from '../api/recipesSlice';
import { RootState, AppDispatch } from '../redux/store';
import Breadcrumb from "./Breadcrumb";
import Pagination from "./Pagination";
import RecipeCard from "./RecipeCard";
import Filter from "./Filter";

const RecipeList: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { recipes, loading, error } = useSelector((state: RootState) => state.recipes);

    //определение состояния пагинации
    const [currentPage, setCurrentPage] = useState(1);
    //определение количество карточек на странице
    const itemsPerPage = 10;

    // Состояние для фильтрации
    const [filter, setFilter] = useState<'all' | 'liked'>('all');

    //хук для получения данных
    useEffect(() => {
        dispatch(fetchRecipes());
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   // const currentItems = recipes.slice(indexOfFirstItem, indexOfLastItem);
    //const totalPages = Math.ceil(recipes.length / itemsPerPage);

    // Фильтрация рецептов в зависимости от выбранного фильтра
    const filteredRecipes = filter === 'liked' ? recipes.filter(recipe => recipe.liked) : recipes;
    const currentItems = filteredRecipes.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);


    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const breadcrumbItems = [
        { label: 'Home', path: '/' },
        { label: 'Recipes', path: '/products' },
    ];

    return (
        <div>
            <div className="bred-filter">
                <Breadcrumb items={breadcrumbItems}/>
                <Filter filter={filter} setFilter={setFilter}/>
            </div>
            {currentItems.map((recipe: any) => (
                <RecipeCard key={recipe.id} id={recipe.id} title={recipe.title} image={recipe.image}
                            liked={recipe.liked}/>
            ))}
            <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={handlePageChange}/>
        </div>
    );
};

export default RecipeList;
