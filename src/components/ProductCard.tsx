// components/RecipeCard.tsx
import React from 'react';
import { useDispatch } from 'react-redux';
//import { toggleLike, deleteRecipe } from '../api/recipesSlice';

interface RecipeCardProps {
    id: number;
    title: string;
    image: string;
    liked: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ id, title, image, liked }) => {
    const dispatch = useDispatch();

    const handleLike = () => {
       // dispatch(toggleLike(id));
    };

    const handleDelete = () => {
       // dispatch(deleteRecipe(id));
    };

    return (
        <div className="recipe-card">
            <img src={image} alt={title} />
            <h3>{title.length > 20 ? title.slice(0, 20) + '...' : title}</h3>
            <button onClick={handleLike}>
                {liked ? '❤️' : '🤍'}
            </button>
            <button onClick={handleDelete}>🗑️</button>
        </div>
    );
};

export default RecipeCard;
