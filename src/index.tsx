// index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Импорт вашего корневого компонента
import { BrowserRouter } from 'react-router-dom'; // Импорт маршрутизатора, если используете React Router
import { Provider } from 'react-redux'; // Импорт провайдера Redux, если используете Redux
import store from './redux/store'; // Импорт вашего Redux store, если используете Redux
import './index.css'; // Импорт глобальных стилей, если есть

// Создание корневого элемента
const rootElement = document.getElementById('root') as HTMLElement;

// Создание корневого рендерера
const root = ReactDOM.createRoot(rootElement);

// Рендеринг приложения
root.render(
    <React.StrictMode>
        <Provider store={store}> {/* Провайдер Redux */}
            <BrowserRouter> {/* Провайдер маршрутизатора */}
                <App /> {/* Ваш корневой компонент */}
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
