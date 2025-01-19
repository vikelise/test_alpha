import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLike, removeRecipe } from '../api/recipesSlice'; // Импортируйте ваше действие
import { useNavigate } from 'react-router-dom';
import "../styles/RecipeCard.css";

interface RecipeCardProps {
    id: number;
    title: string;
    image: string;
    liked: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ id, title, image }) => {
    const dispatch = useDispatch();
    // Используйте useSelector для получения состояния "нравится" из store
    const isLiked = useSelector((state: any) =>
        state.recipes.recipes.find((recipe: RecipeCardProps) => recipe.id === id)?.liked
    );

    const handleLikeToggle = (event: React.MouseEvent<SVGSVGElement>) => {
        event.stopPropagation(); // Предотвращаем всплытие события
        dispatch(toggleLike(id));
    };

    const handleRemoveClick = (event: React.MouseEvent<SVGSVGElement>) => {
        event.stopPropagation(); // Предотвращаем всплытие события
        dispatch(removeRecipe(id));
    };

    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/products/${id}`);
    };

    return (
        <div className="card" onClick={handleCardClick}>
            <div className="card-img">
                <img src={image} alt="card photo" />
            </div>
            <div className="card-title"><b><p>{title}</p></b></div>
            <div className="card-btn">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`bi ${isLiked ? 'bi-heart-fill' : 'bi-heart'}`}
                    viewBox="0 0 16 16"
                    onClick={handleLikeToggle}
                >
                    <path
                        d={isLiked
                            ?  "M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
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
    );
};

export default RecipeCard;
