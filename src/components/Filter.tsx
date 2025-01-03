// Filter.tsx
import React from 'react';

const Filter: React.FC<{ onFilterChange: (filter: string) => void }> = ({ onFilterChange }) => {
    return (
        <div>
            <button onClick={() => onFilterChange('all')}>Все</button>
            <button onClick={() => onFilterChange('favorites')}>Избранные</button>
        </div>
    );
};

export default Filter;
