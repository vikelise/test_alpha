// Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header>
            <h1>Книга рецетов </h1>
            <nav>
                <Link to="/products">Продукты</Link>
                <Link to="/create-product">Создать рецепт</Link>
            </nav>
        </header>
    );
};

export default Header;
