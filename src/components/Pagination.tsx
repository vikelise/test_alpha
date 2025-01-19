// components/Pagination.tsx

import React from 'react';
import "../styles/Pagination.css";

interface PaginationProps {
    currentPage: number;//текущая страница, на которой находится пользователь
    totalPages: number;//общее количество страниц
    setCurrentPage: (page: number) => void;//функция которая будет вызываться при изменении страницы
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, setCurrentPage }) => {
    const renderPagination = () => {
        const paginationItems = [];

        // Если текущая страница первая
        if (currentPage === 1) {
            paginationItems.push(
                <span key={1} className="active" onClick={() => setCurrentPage(1)}>1</span>
            );

            // Добавляем страницы 2 и 3
            for (let i = 2; i <= Math.min(3, totalPages); i++) {
                paginationItems.push(
                    <span key={i} className={currentPage === i ? 'active' : ''} onClick={() => setCurrentPage(i)}>
                {i}
            </span>
                );
            }

            // Добавляем многоточие, если есть страницы после 3
            if (totalPages > 3) {
                paginationItems.push(<span key="ellipsis">...</span>);
                paginationItems.push(
                    <span key={totalPages} className={currentPage === totalPages ? 'active' : ''} onClick={() => setCurrentPage(totalPages)}>
                {totalPages}
            </span>
                );
            }
        }
        // Если текущая страница последняя
        else if (currentPage === totalPages) {
            paginationItems.push(
                <span key={1} className={currentPage === 1 ? 'active' : ''} onClick={() => setCurrentPage(1)}>1</span>
            );

            // Добавляем многоточие, если есть страницы перед последней
            if (totalPages > 3) {
                paginationItems.push(<span key="ellipsis">...</span>);
                for (let i = totalPages - 2; i <= totalPages; i++) {
                    paginationItems.push(
                        <span key={i} className={currentPage === i ? 'active' : ''} onClick={() => setCurrentPage(i)}>
                    {i}
                </span>
                    );
                }
            } else {
                for (let i = 2; i < totalPages; i++) {
                    paginationItems.push(
                        <span key={i} className={currentPage === i ? 'active' : ''} onClick={() => setCurrentPage(i)}>
                    {i}
                </span>
                    );
                }
            }
        }
        // Если текущая страница где-то посередине
        else {
            paginationItems.push(
                <span key={1} className={currentPage === 1 ? 'active' : ''} onClick={() => setCurrentPage(1)}>1</span>
            );

            // Добавляем многоточие, если есть страницы после первой
            if (currentPage > 2) {
                paginationItems.push(<span key="ellipsis">...</span>);
            }

            // Добавляем страницы вокруг текущей
            for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                if (i > 1 && i < totalPages) { // Не добавляем первую и последнюю страницы
                    paginationItems.push(
                        <span key={i} className={currentPage === i ? 'active' : ''} onClick={() => setCurrentPage(i)}>
                    {i}
                </span>
                    );
                }
            }

            // Добавляем многоточие, если есть страницы после текущей
            if (currentPage < totalPages - 1) {
                paginationItems.push(<span key="ellipsis2">...</span>);
            }

            // Добавляем последнюю страницу
            if (totalPages > 1) {
                paginationItems.push(
                    <span key={totalPages} className={currentPage === totalPages ? 'active' : ''} onClick={() => setCurrentPage(totalPages)}>
                {totalPages}
            </span>
                );
            }
        }

        return paginationItems;
    };

    return (
        <div className="pagination">
            {renderPagination()}
        </div>
    );
};

export default Pagination;
