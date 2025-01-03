// CreateProduct.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/actions';

const CreateProduct: React.FC = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(addProduct({ title, description, image }));
        setTitle('');
        setDescription('');
        setImage('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Название" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <textarea placeholder="Описание" value={description} onChange={(e) => setDescription(e.target.value)} required />
            <input type="text" placeholder="Ссылка на изображение" value={image} onChange={(e) => setImage(e.target.value)} required />
            <button type="submit">Создать продукт</button>
        </form>
    );
};

export default CreateProduct;
