// App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Импорт маршрутов
import Home from './components/Home'; // Импорт компонента главной страницы
//import NotFound from './components/NotFound'; // Импорт компонента для обработки 404
import Header from './components/Header'; // Импорт компонента заголовка
//import Footer from './components/Footer';
import RecipeList from "./components/RecipeList"; // Импорт компонента нижнего колонтитула
import RecipeDetail from "./components/RecipeDetail";
import CreateCard from "./components/CreateProduct";

const App: React.FC = () => {
  return (
      <div>
        <Header /> {/* Заголовок приложения */}
        <main className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<RecipeList />} /> {/* Главная страница */}
            <Route path="/products/:id" element={<RecipeDetail />} />
            <Route path="/create-product" element={<CreateCard />} />
              //Route path="*" element={ }  {/* Страница 404 */}

          </Routes>
        </main>
      </div>
  );
};

export default App;
