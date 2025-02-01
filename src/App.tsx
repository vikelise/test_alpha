// App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Импорт маршрутов
import Home from './components/Home'; // Импорт компонента главной страницы
import NotFound from './components/NotFound'; // Импорт компонента для обработки 404
import RecipeList from "./components/RecipeList"; // Импорт компонента нижнего колонтитула
import RecipeDetail from "./components/RecipeDetail";
import CreateCard from "./components/CreateProduct";
import "./App.css";

const App: React.FC = () => {
  return (
      <div>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<RecipeList />} />
            <Route path="/products/:id" element={<RecipeDetail />} />
            <Route path="/create-product" element={<CreateCard />} />
            <Route path="*" element={<NotFound/> }/> 
          </Routes>
        </main>
      </div>
  );
};

export default App;
