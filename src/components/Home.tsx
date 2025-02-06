// Home.tsx
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import "../styles/Home.css";
import Header from "./Header";
import Footer from "./Footer";

const Home: React.FC = () => {
    const navigate = useNavigate(); // Инициализация хука useNavigate
    const [isWideScreen, setIsWideScreen] = useState<boolean>(window.innerWidth > 911);

    useEffect(() => {
        const handleResize = () => {
            setIsWideScreen(window.innerWidth > 911);
        };

        window.addEventListener('resize', handleResize);

        // Удаляем обработчик при размонтировании компонента
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const handleWatchRecipes = () => {
        navigate('/products'); // Переход на страницу /products
    };

    const handleCreateRecipe = () => {
        navigate('/create-product'); // Переход на страницу создания рецепта (например)
    };

    return (
        <div className="app-container">
            <div className="content main-container">
                <Header/>
                <div className="home">
                    <h1 className="home-welcome">Welcome to the main page of the recipe book! Choose what you want to
                        do</h1>
                    <img src={require('../images/main4.jpg')} alt="photo" className="home-img"/>

                    <div className="button-container">
                        <button className="home-btn1" onClick={handleWatchRecipes}>Watch all recipes</button>
                        <h1 className="home-or">or</h1>
                        <button className="home-btn2" onClick={handleCreateRecipe}>Create your</button>
                    </div>
                    {isWideScreen &&
                        <div className="home-welcome-text">
                            <p className="home-welcome-text-title"><b>About us</b></p>
                            <p>Welcome to my website, where you will find many delicious recipes that inspire you to
                                experiment with cooking! This project is my little passion, and I hope that it will
                                become a useful assistant in the kitchen for you. Here you will find dishes for every
                                taste and skill level. Enjoy!</p>
                        </div>
                    }
                </div>
            </div>
            {isWideScreen &&
                <Footer/>}

        </div>
    );
};

export default Home;
