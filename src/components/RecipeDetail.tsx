import React from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Recipe, removeRecipe, toggleLike} from '../api/recipesSlice';
import Breadcrumb from "./Breadcrumb";
import DOMPurify from 'dompurify';
import "../styles/RecipeDetail.css";
import Header from "./Header";
import Footer from "./Footer";

interface Product {
    nameClean: string;
    amount: number;
    unit: string;
}


const RecipeDetail: React.FC = () => {
    const {id} = useParams<{ id?: string }>(); // id может быть undefined
    const recipeId = id ? parseInt(id, 10) : null; // Преобразуем id в число, если оно существует

    const dispatch = useDispatch();

    // Используем useSelector для получения рецепта из Redux store
    const recipe = useSelector((state: any) =>
        state.recipes.recipes.find((recipe: Recipe) => recipe.id === recipeId)
    );
    const breadcrumbItems = [
        {label: 'Home', path: '/'},
        {label: 'Recipes', path: '/products'},
    ];

    if (recipeId === null || !recipe) {
        return <div className="app-container">
            <div className="main-container">
                <Header/>
                <div className="recipe-container">
                    <Breadcrumb items={breadcrumbItems}/>
                    <p>Рецепт не найден</p>
                </div>
            </div>
            <Footer/>
        </div>;
    }


    const handleLikeToggle = (event: React.MouseEvent<SVGSVGElement>) => {
        event.stopPropagation(); // Предотвращаем всплытие события
        dispatch(toggleLike(recipe.id));
    };

    const handleRemoveClick = (event: React.MouseEvent<SVGSVGElement>) => {
        event.stopPropagation(); // Предотвращаем всплытие события
        dispatch(removeRecipe(recipe.id));
    };

    return (
        <div className="app-container">
            <div className="main-container">
                <Header/>
                <div className="recipe-container">
                    <Breadcrumb items={breadcrumbItems}/>
                    <img src={recipe.image} alt={recipe.title}/>
                    <h2>{recipe.title}</h2>
                    <div className="recipe-tags-container">
                        <p className="recipe-tags">{recipe.vegan ? "vegan" : "not vegan"}</p>
                        <p className="recipe-tags">{recipe.vegetarian ? "vegetarian" : "not vegetarian"}</p>
                        <p className="recipe-tags">{recipe.glutenFree ? "gluten free" : "not gluten free"}</p>
                        <p className="recipe-tags">{recipe.dairyFree ? "dairy free" : "not dairy free"}</p>
                        <p className="recipe-tags">{recipe.veryHealthy ? "very healthy" : "not very healthy"}</p>
                        <p className="recipe-tags">{recipe.cheap ? "cheap" : "not cheap"}</p>
                        <p className="recipe-tags">{recipe.veryPopular ? "very popular" : "not very popular"}</p>
                        <p className="recipe-tags">{recipe.sustainable ? "sustainable" : "not sustainable"}</p>
                        <p className="recipe-tags">{recipe.lowFodmap ? "low fodmap" : "not low fodmap"}</p>
                    </div>
                    <div className="recipe-summary"
                         dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(recipe.summary)}}/>
                    <div className="recipe-info-card-container">
                        <div className="recipe-info-card-item">
                            <p>Weight watcher smart points</p>
                            <div className="recipe-info-card-item-detail">
                                <p>{recipe.weightWatcherSmartPoints}</p>
                            </div>
                        </div>
                        <div className="recipe-info-card-item">
                            <p>Health score</p>
                            <div className="recipe-info-card-item-detail">
                                <p>{recipe.healthScore}</p>
                            </div>
                        </div>
                        <div className="recipe-info-card-item">
                            <p>Price per serving</p>
                            <div className="recipe-info-card-item-detail">
                                <p>{recipe.pricePerServing}$</p>
                            </div>
                        </div>
                        <div className="recipe-info-card-item">
                            <p>Servings</p>
                            <div className="recipe-info-card-item-detail">
                                <p>{recipe.servings}</p>
                            </div>
                        </div>
                    </div>
                    <div className="recipe-time-container">
                        <div>
                            <p><b>Ready time:</b></p>
                            <div className="recipe-time-item">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     className="bi bi-alarm" viewBox="0 0 16 16">
                                    <path
                                        d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9z"/>
                                    <path
                                        d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1zm1.038 3.018a6 6 0 0 1 .924 0 6 6 0 1 1-.924 0M0 3.5c0 .753.333 1.429.86 1.887A8.04 8.04 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5M13.5 1c-.753 0-1.429.333-1.887.86a8.04 8.04 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1"/>
                                </svg>
                                <div>{(() => {
                                    const hours = Math.floor(recipe.readyInMinutes / 60);
                                    const minutes = recipe.readyInMinutes % 60;

                                    return (
                                        <p>
                                            {hours > 0 && <span>{hours} h</span>}
                                            {minutes > 0 && <span>{minutes} min</span>}
                                        </p>
                                    );
                                })()}</div>
                            </div>
                        </div>
                        <div>
                            <p><b>Cooking time:</b></p>
                            <div className="recipe-time-item">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     className="bi bi-clock-history" viewBox="0 0 16 16">
                                    <path
                                        d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z"/>
                                    <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z"/>
                                    <path
                                        d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5"/>
                                </svg>
                                <div>{(() => {
                                    const hours = Math.floor(recipe.cookingMinutes / 60);
                                    const minutes = recipe.cookingMinutes % 60;

                                    return (
                                        <p>
                                            {hours > 0 && <span>{hours} h</span>}
                                            {minutes > 0 && <span>{minutes} min</span>}
                                        </p>
                                    );
                                })()}</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p><b>Products:</b></p>
                        <div>
                            {recipe.extendedIngredients.map((product: Product, index: number) => (
                                <div key={index} className="product-item-container">
                                    <div className="product-item">
                                        <p>{product.nameClean}</p>
                                        <div className="product-item-units">
                                            <p>{product.amount}</p>
                                            <p>{product.unit}</p>
                                        </div>
                                    </div>
                                    {index < recipe.extendedIngredients.length - 1 && <div className="dotted-line"/>}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="recipe-instructions">
                        <p><b>Instructions:</b></p>
                        <div className="recipe-instructions-info"
                             dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(recipe.instructions)}}/>
                    </div>
                    <div className="card-btn card-btn-details">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`bi ${recipe.liked ? 'bi-heart-fill' : 'bi-heart'}`}
                            viewBox="0 0 16 16"
                            onClick={handleLikeToggle}
                        >
                            <path
                                d={recipe.liked
                                    ? "M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                                    : "m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"}
                            />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 16 16"
                             onClick={handleRemoveClick}
                        >
                            <path
                                d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                        </svg>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>


    );
};

export default RecipeDetail;
