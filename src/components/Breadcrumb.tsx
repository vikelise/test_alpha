// components/Breadcrumb.tsx
import React from 'react';
import { Link } from 'react-router-dom'; // Если вы используете react-router для навигации
import "../styles/Breadcrumb.css";

const Breadcrumb: React.FC<{ items: { label: string; path: string }[] }> = ({ items }) => {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                {items.map((item, index) => (
                    <li key={index} className="breadcrumb-item">
                        <Link to={item.path}><b>{item.label}</b></Link>
                        {index < items.length - 1 && ' / '}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
