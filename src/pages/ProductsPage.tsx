// ProductsPage.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';

const ProductsPage: React.FC = () => {
    const products = useSelector((state: any) => state.products);
    const [filter, setFilter] = React.useState<'all' | 'favorites'>('all');

    const filteredProducts = filter === 'favorites'
        ? products.filter(product => product.isLiked)
        : products;

    return (
        <div>
            <h1>Список продуктов</h1>
            <button onClick={() => setFilter('all')}>Все</button>
            <button onClick={() => setFilter('favorites')}>Избранные</button>
            <div className="product-list">
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;
