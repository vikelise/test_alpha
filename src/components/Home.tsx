// Home.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Home.css";
import Header from "./Header";

const Home: React.FC = () => {
    const navigate = useNavigate(); // Инициализация хука useNavigate

    const handleWatchRecipes = () => {
        navigate('/products'); // Переход на страницу /products
    };

    const handleCreateRecipe = () => {
        navigate('/create-product'); // Переход на страницу создания рецепта (например)
    };

    return (
        <div className="home">
            <Header />
            <h1 className="home-welcome">Welcome to the main page of the recipe book! Choose what you want to do</h1>
            <img src={require('../images/main4.jpg')} alt="photo" className="home-img"/>
            <button className="home-btn1"  onClick={handleWatchRecipes}>Watch all recipes</button>
            <h1 className="home-or">or</h1>
            <button className="home-btn2"  onClick={handleCreateRecipe}>Create your</button>
        </div>
    );
};

export default Home;
