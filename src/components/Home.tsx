// Home.tsx
import React from 'react';
import "../App.css";

const Home: React.FC = () => {
    return (
        <div className="home">
            <h1 className="home-welcome">Welcome to the main page of the recipe book! Choose what you want to do</h1>
            <img src={require('../images/main4.jpg')} alt="photo" className="home-img"/>
            <button className="home-btn1">Watch all recipes</button>
            <h1 className="home-or">or</h1>
            <button className="home-btn2">Create your</button>
        </div>
    );
};

export default Home;
