// ProductDetailPage.tsx
import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const history = useHistory();
    const product = useSelector((state: any) =>
        state.products.find((p: any) => p.id === Number(id))
    );

    if (!product) {
        return <div>Продукт не найден</div>;
    }

    return (
        <div>
            <h1>{product.title}</h1>
            <img src={product.image} alt={product.title} />
            <p>{product.description}</p>
            <button onClick={() => history.push('/products')}>Назад</button>
        </div>
    );
};

export default ProductDetailPage;
