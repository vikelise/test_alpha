import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addRecipe } from '../api/recipesSlice';
import Breadcrumb from "./Breadcrumb";
import "../styles/CreateProduct.css";
import Footer from "./Footer";
import Header from "./Header";

const CreateCard: React.FC = () => {
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');

        // Минимальная валидация
        if (!title || !image || !description) {
            setError('Все поля обязательны');
            return;
        }

        // Создание нового продукта
        const newProduct = {
            id: Date.now(), // или используйте другой метод для генерации уникального ID
            title,
            image,
        };

        // Сохранение продукта в Redux store
       // dispatch(addRecipe(newProduct));

        // Очистка формы
        setTitle('');
        setImage('');
        setDescription('');
    };

    const breadcrumbItems = [
        { label: 'Home', path: '/' },
        { label: 'Create', path: '/create-product' },
    ];

    return (
        <div className="app-container">
            <div className="main-container">
            <Header />
            <Breadcrumb items={breadcrumbItems}/>
            <h1>Create recipe</h1>
            <form onSubmit={handleSubmit} className="form-container">
                <div>
                    <label>
                        Title:
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Image:
                        <input
                            type="text"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            required
                        />
                    </label>
                </div>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <button type="submit">Create</button>
            </form>
            </div>
            <Footer/>
        </div>
    );
};

export default CreateCard;
