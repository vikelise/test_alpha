// Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="text-logo">
                <p>Recipe book </p>
            </div>
            <nav>
                <Link to="/products">Recipes</Link>
                <Link to="/create-product">Create</Link>
            </nav>
        </header>
    );
};

export default Header;
