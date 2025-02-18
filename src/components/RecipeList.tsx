// components/RecipeList.tsx

import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchRecipes, fetchRecipeDetails, Recipe} from '../api/recipesSlice';
import {RootState, AppDispatch} from '../redux/store';
import Breadcrumb from "./Breadcrumb";
import Pagination from "./Pagination";
import RecipeCard from "./RecipeCard";
import Filter from "./Filter";
import Footer from "./Footer";
import Header from "./Header";
import "../styles/RecipeList.css";

const RecipeList: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const {recipes, loading, error} = useSelector((state: RootState) => state.recipes);

    //определение состояния пагинации
    const [currentPage, setCurrentPage] = useState(1);
    //определение количество карточек на странице
    const itemsPerPage = 12;

    // Состояние для фильтрации
    const [filter, setFilter] = useState<'all' | 'liked'>('all');

    //хук для получения данных
    useEffect(() => {
        const fetchData = async () => {
            const result = await dispatch(fetchRecipes());
            if (result.meta.requestStatus === 'fulfilled') {
                // Запрашиваем детали для каждого рецепта
                result.payload.forEach((recipe: Recipe) => {
                    dispatch(fetchRecipeDetails(recipe.id));
                });
            }
        };
        fetchData();
    }, [dispatch]);

    if (loading) {
        return (
            <div className="loading-error-container">
                <img src={require('../images/loading.gif')} alt="Loading GIF" className="loading-error-img"/>
                <p><b>Loading...</b></p>
            </div>

        );
    }

    if (error) {
        return (
            <div className="loading-error-container">
                <img src={require('../images/error2.jpg')} alt="Loading GIF" className="loading-error-img"/>
                <p><b>Error: {error}</b></p>
            </div>
        );
    }

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
        {label: 'Home', path: '/'},
    ];

    return (
        <div className="app-container">
            <div className="main-container">
                <Header/>
                <div className="bred-filter">
                    <Breadcrumb items={breadcrumbItems}/>
                    <Filter filter={filter} setFilter={setFilter}/>
                </div>
                <div className="recipe-list-container">
                {currentItems.map((recipe: any) => (
                    <RecipeCard key={recipe.id} id={recipe.id} title={recipe.title} image={recipe.image}
                                liked={recipe.liked}/>
                ))}
                </div>
                <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={handlePageChange}/>
            </div>
            <Footer/>
        </div>
    );
};

export default RecipeList;
