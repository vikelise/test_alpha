import React, { useState, useEffect, useRef } from 'react';

interface FilterProps {
    filter: 'all' | 'liked';
    setFilter: (filter: 'all' | 'liked') => void;
}

const Filter: React.FC<FilterProps> = ({ filter, setFilter }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null); // Create a ref for the dropdown

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleFilterChange = (newFilter: 'all' | 'liked') => {
        setFilter(newFilter);
        setDropdownOpen(false); // Close dropdown after selection
    };

    // Handle clicks outside the dropdown
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setDropdownOpen(false); // Close dropdown if clicked outside
        }
    };

    useEffect(() => {
        // Add event listener for clicks
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="filter-container">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="filter"
                viewBox="0 0 16 16"
                onClick={toggleDropdown}
            >
                <path
                    fillRule="evenodd"
                    d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1z"
                />
            </svg>

            {isDropdownOpen && (
                <div className="dropdown" ref={dropdownRef}>
                    <button onClick={() => handleFilterChange('all')} disabled={filter === 'all'}>
                        All
                    </button>
                    <button onClick={() => handleFilterChange('liked')} disabled={filter === 'liked'}>
                        Liked
                    </button>
                </div>
            )}
        </div>
    );
};

export default Filter;
