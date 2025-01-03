// App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Импорт маршрутов
//import Home from './components/Home'; // Импорт компонента главной страницы
//import NotFound from './components/NotFound'; // Импорт компонента для обработки 404
import Header from './components/Header'; // Импорт компонента заголовка
//import Footer from './components/Footer';
import RecipeList from "./components/RecipeList"; // Импорт компонента нижнего колонтитула

const App: React.FC = () => {
  return (
      <div>
        <Header /> {/* Заголовок приложения */}
        <main>
          <Routes>
            <Route path="/products" element={<RecipeList />} /> {/* Главная страница */}
            //Route path="*" element={ }  {/* Страница 404 */}

          </Routes>
        </main>
      </div>
  );
};

export default App;
