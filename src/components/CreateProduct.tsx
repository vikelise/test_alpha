import React, {useState, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {addRecipe} from '../api/recipesSlice';
import Breadcrumb from "./Breadcrumb";
import "../styles/CreateProduct.css";
import Footer from "./Footer";
import Header from "./Header";
import {uploadImage} from '../redux/imageSlice';

const CreateCard: React.FC = () => {
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [summary, setSummary] = useState('');
    const [instructions, setInstructions] = useState('');
    const [error, setError] = useState('');
    const [servings, setServings] = useState<number | string>(1);
    const [healthScore, setHealthScore] = useState<number | string>(50);
    const [weightWatcherSmartPoints, setWeightWatcherSmartPoints] = useState<number | string>(0);
    const [pricePerServing, setPricePerServing] = useState<number | string>(0);
    const [readyHours, setReadyHours] = useState<number>(0);
    const [readyMinutes, setReadyMinutes] = useState<number>(0);
    const [cookingHours, setCookingHours] = useState<number>(0);
    const [cookingMinutes, setCookingMinutes] = useState<number>(0);
    const [vegan, setVegan] = useState(false);
    const [vegetarian, setVegetarian] = useState(false);
    const [glutenFree, setGlutenFree] = useState(false);
    const [dairyFree, setDairyFree] = useState(false);
    const [veryHealthy, setVeryHealthy] = useState(false);
    const [cheap, setCheap] = useState(false);
    const [veryPopular, setVeryPopular] = useState(false);
    const [sustainable, setSustainable] = useState(false);
    const [lowFodmap, setLowFodmap] = useState(false);
    const [extendedIngredients, setExtendedIngredients] = useState<{ nameClean: string; amount: number; unit: string; }[]>([]);
    const [productName, setProductName] = useState('');
    const [productAmount, setProductAmount] = useState<number | ''>('');
    const [productUnit, setProductUnit] = useState('');
    const [fieldErrors, setFieldErrors] = useState<{ [key: string]: boolean }>({
        title: false,
        image: false,
        summary: false,
        instructions: false,
        readyMinutes: false,
        cookingMinutes: false,
    });
    const [isProductListVisible, setIsProductListVisible] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');
        setFieldErrors({
            title: false,
            image: false,
            summary: false,
            instructions: false,
            readyMinutes: false,
            cookingMinutes: false,
        });

        const newFieldErrors = {
            title: !title,
            image: !image,
            summary: !summary,
            instructions: !instructions,
            readyMinutes: !readyMinutes,
            cookingMinutes: !cookingMinutes,
        };

        if (Object.values(newFieldErrors).some(Boolean)) {
            setFieldErrors(newFieldErrors);
            setError('All fields are required');
            return;
        }

        const finalServings = servings === '' ? 1 : Number(servings);
        const finalHealthScore = healthScore === '' ? 50 : Number(healthScore);
        const finalWeightWatcherSmartPoints = weightWatcherSmartPoints === '' ? 0 : Number(weightWatcherSmartPoints);
        const finalPricePerServing = pricePerServing === '' ? 0 : Number(pricePerServing);

        // Создание нового рецепта
        const newRecipe = {
            id:  Math.floor(Math.random() * 1000000),
            title,
            image,
            readyInMinutes: totalReadyInMinutes,
            cookingMinutes: totalCookingMinutes,
            pricePerServing: finalPricePerServing,
            summary,
            vegan,
            vegetarian,
            glutenFree,
            dairyFree,
            veryHealthy,
            cheap,
            veryPopular,
            sustainable,
            lowFodmap,
            weightWatcherSmartPoints: finalWeightWatcherSmartPoints,
            healthScore: finalHealthScore,
            liked: false,
            servings: finalServings,
            extendedIngredients,
            instructions,
        };

        // Сохранение рецепта в Redux store
        dispatch(addRecipe(newRecipe));

        // Очистка формы
        setTitle('');
        setImage('');
        setSummary('');
        setInstructions('');
        setServings(1);
        setHealthScore(50);
        setWeightWatcherSmartPoints(0);
        setPricePerServing(0);
        setVegan(false);
        setVegetarian(false);
        setGlutenFree(false);
        setDairyFree(false);
        setVeryHealthy(false);
        setCheap(false);
        setVeryPopular(false);
        setSustainable(false);
        setLowFodmap(false);
        setProductName('');
        setProductAmount('');
        setProductUnit('');
    };


    const breadcrumbItems = [
        {label: 'Home', path: '/'},
        {label: 'Create', path: '/create-product'},
    ];

    const totalReadyInMinutes = (readyHours * 60) + readyMinutes;
    const totalCookingMinutes = (cookingHours * 60) + cookingMinutes;

    const toggleProductListVisibility = () => {
        setIsProductListVisible(prev => !prev);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            const validTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
            if (!validTypes.includes(file.type)) {
                alert('Please upload image file (JPG, PNG, SVG)');
                return;
            }
            const imageUrl = URL.createObjectURL(file); // Создаем URL для изображения
            setImage(imageUrl); // Сохраняем URL в локальном состоянии
            dispatch(uploadImage(imageUrl)); // Отправляем URL вместо файла
        }
    };

    const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault(); // Предотвращаем стандартное поведение
        const files = event.dataTransfer.files;
        if (files && files.length > 0) {
            const file = files[0];
            const validTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
            if (!validTypes.includes(file.type)) {
                alert('Please upload image file (JPG, PNG, SVG)');
                return;
            }
            const imageUrl = URL.createObjectURL(file); // Создаем URL для изображения
            setImage(imageUrl); // Сохраняем URL в локальном состоянии
            dispatch(uploadImage(imageUrl)); // Отправляем URL вместо файла
        }
    }, [dispatch]);

    const changeValue = (setter: React.Dispatch<React.SetStateAction<number | string>>, change: number, isServings: boolean = false) => {
        setter(prevValue => {
            // Преобразуем prevValue в число, если это строка
            const currentValue = typeof prevValue === 'string' ? Number(prevValue) : prevValue;

            // Проверяем, является ли это полем "Servings" и если да, то применяем логику
            if (isServings) {
                const newValue = Math.max(1, currentValue + change);
                return newValue.toString(); // Возвращаем как строку
            }

            // Для остальных полей просто увеличиваем или уменьшаем значение
            const newValue = Math.max(0, currentValue + change);
            return newValue.toString(); // Возвращаем как строку
        });
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === '+' || event.key === '-') {
            event.preventDefault(); // Предотвращаем ввод символа
        }
    };

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<number | string>>, isServings: boolean = false) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        if (newValue === '') {
            setter('');
            return;
        }
        const numericValue = Number(newValue);
        if (isNaN(numericValue)) {
            return; // Игнорируем ввод, если это не число
        }
        if (isServings) {
            if (numericValue >= 1) {
                setter(numericValue);
            }
        } else {

            setter(numericValue);

        }
    };

    const handleAddIngredient = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        // Проверка, что все поля заполнены перед добавлением
        if (!productName || !productAmount) {
            setError('Please fill in all ingredient fields');
            return;
        }

        // Создать новый ингредиент
        const newIngredient = { nameClean: productName, amount: Number(productAmount), unit: productUnit };

        // Добавить новый ингредиент в массив
        setExtendedIngredients(prevIngredients => [...prevIngredients, newIngredient]);

        // Сбросить поля ввода
        setProductName('');
        setProductAmount('');
        setProductUnit('');
    };

    return (
        <div className="app-container">
            <div className="main-container">
                <Header/>
                <div className="create-container">
                    <Breadcrumb items={breadcrumbItems}/>
                    <h1>Create your recipe</h1>
                    <form onSubmit={handleSubmit} className="form-container">
                        <div className="form-text-inputs">
                            <p>Title:</p>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="write title"
                                className={fieldErrors.title ? "error" : undefined}
                            />
                        </div>
                        <div className="form-text-inputs">
                            <p>Summary:</p>
                            <textarea
                                value={summary}
                                onChange={(e) => setSummary(e.target.value)}
                                placeholder="write summary"
                                className={fieldErrors.summary ? "error" : undefined}
                            />
                        </div>
                        <div className="form-text-inputs">
                            <p>Instructions:</p>
                            <textarea
                                value={instructions}
                                onChange={(e) => setInstructions(e.target.value)}
                                placeholder="write instructions"
                                className={fieldErrors.instructions ? "error" : undefined}
                            />
                        </div>
                        <div className="form-checkbox-container">
                            <div>
                                <input type="checkbox" className="custom-checkbox" id="vegan" name="vegan"
                                       checked={vegan} onChange={() => setVegan(!vegan)}/>
                                <label className="checkbox-label" htmlFor="vegan">vegan</label>
                            </div>
                            <div>
                                <input type="checkbox" className="custom-checkbox" id="vegetarian" name="vegetarian"
                                       checked={vegetarian} onChange={() => setVegetarian(!vegetarian)}/>
                                <label className="checkbox-label" htmlFor="vegetarian">vegetarian</label>
                            </div>
                            <div>
                                <input type="checkbox" className="custom-checkbox" id="glutenFree" name="glutenFree"
                                       checked={glutenFree} onChange={() => setGlutenFree(!glutenFree)}/>
                                <label className="checkbox-label" htmlFor="glutenFree">gluten free</label>
                            </div>
                            <div>
                                <input type="checkbox" className="custom-checkbox" id="dairyFree" name="dairyFree"
                                       checked={dairyFree} onChange={() => setDairyFree(!dairyFree)}/>
                                <label className="checkbox-label" htmlFor="dairyFree">dairy free</label>
                            </div>
                            <div>
                                <input type="checkbox" className="custom-checkbox" id="veryHealthy" name="veryHealthy"
                                       checked={veryHealthy} onChange={() => setVeryHealthy(!veryHealthy)}/>
                                <label className="checkbox-label" htmlFor="veryHealthy">very healthy</label>
                            </div>
                            <div>
                                <input type="checkbox" className="custom-checkbox" id="cheap" name="cheap"
                                       checked={cheap} onChange={() => setCheap(!cheap)}/>
                                <label className="checkbox-label" htmlFor="cheap">cheap</label>
                            </div>
                            <div>
                                <input type="checkbox" className="custom-checkbox" id="veryPopular" name="veryPopular"
                                       checked={veryPopular} onChange={() => setVeryPopular(!veryPopular)}/>
                                <label className="checkbox-label" htmlFor="veryPopular">very popular</label>
                            </div>
                            <div>
                                <input type="checkbox" className="custom-checkbox" id="sustainable" name="sustainable"
                                       checked={sustainable} onChange={() => setSustainable(!sustainable)}/>
                                <label className="checkbox-label" htmlFor="sustainable">sustainable</label>
                            </div>
                            <div>
                                <input type="checkbox" className="custom-checkbox" id="lowFodmap" name="lowFodmap"
                                       checked={lowFodmap} onChange={() => setLowFodmap(!lowFodmap)}/>
                                <label className="checkbox-label" htmlFor="lowFodmap">low fodmap</label>
                            </div>
                        </div>
                        <div className="form-recipe-info-card">
                            <div className="form-recipe-info-card-item">
                                <p>Servings:</p>
                                <div className="form-recipe-info-card-item-value">
                                    <button onClick={() => changeValue(setServings, -1, true)} className="button-minus-plus" type="button"><b>-</b></button>
                                    <input
                                        type="number"
                                        value={servings}
                                        onChange={handleInputChange(setServings, true)}
                                        onKeyPress={handleKeyPress}
                                        min="1"
                                    />
                                    <button onClick={() => changeValue(setServings, 1)} className="button-minus-plus" type="button"><b>+</b></button>
                                </div>
                            </div>
                            <div className="form-recipe-info-card-item">
                                <p>Health score:</p>
                                <div className="form-recipe-info-card-item-value">
                                    <button onClick={() => changeValue(setHealthScore, -1)} className="button-minus-plus" type="button"><b>-</b></button>
                                    <input
                                        type="number"
                                        value={healthScore}
                                        onChange={handleInputChange(setHealthScore)}
                                        onKeyPress={handleKeyPress}
                                        min="0"
                                    />
                                    <button onClick={() => changeValue(setHealthScore, 1)} className="button-minus-plus" type="button"><b>+</b></button>
                                </div>
                            </div>
                            <div className="form-recipe-info-card-item">
                                <p>Weight watcher smart points:</p>
                                <div className="form-recipe-info-card-item-value">
                                    <button onClick={() => changeValue(setWeightWatcherSmartPoints, -1)} className="button-minus-plus" type="button"><b>-</b></button>
                                    <input
                                        type="number"
                                        value={weightWatcherSmartPoints}
                                        onChange={handleInputChange(setWeightWatcherSmartPoints)}
                                        onKeyPress={handleKeyPress}
                                        min="0"
                                    />
                                    <button onClick={() => changeValue(setWeightWatcherSmartPoints, 1)} className="button-minus-plus" type="button"><b>+</b></button>
                                </div>
                            </div>
                            <div className="form-recipe-info-card-item">
                                <p>Price per serving:</p>
                                <div className="form-recipe-info-card-item-value">
                                    <input
                                        type="number"
                                        value={pricePerServing}
                                        onChange={handleInputChange(setPricePerServing)}
                                        onKeyPress={handleKeyPress}
                                        min="0"
                                    />
                                    <label>$ (USD)</label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="form-time-container">
                                <p><b>Ready time:</b></p>
                                <div className="form-time-item-container">
                                    <div className="form-time-item">
                                        <label htmlFor="cooking-hours-input">Hours:</label>
                                        <input type="number"
                                               min="0"
                                               onChange={(e) => setReadyHours(Number(e.target.value))}
                                               onKeyPress={handleKeyPress}/>
                                    </div>
                                    <div className="form-time-item">
                                        <label htmlFor="cooking-minutes-input">Minutes:</label>
                                        <input type="number"
                                               min="0"
                                               max="59"
                                               onChange={(e) => setReadyMinutes(Number(e.target.value))}
                                               className={fieldErrors.readyMinutes ? "error" : undefined}
                                               onKeyPress={handleKeyPress}
                                               />
                                    </div>
                                </div>
                            </div>
                            <div className="form-time-container">
                                <p><b>Cooking time:</b></p>
                                <div className="form-time-item-container">
                                    <div className="form-time-item">
                                        <label htmlFor="cooking-hours-input">Hours:</label>
                                        <input type="number"
                                               min="0"
                                               onChange={(e) => setCookingHours(Number(e.target.value))}
                                               onKeyPress={handleKeyPress}/>
                                    </div>
                                    <div className="form-time-item">
                                        <label htmlFor="cooking-minutes-input">Minutes:</label>
                                        <input type="number"
                                               min="0"
                                               max="59"
                                               onChange={(e) => setCookingMinutes(Number(e.target.value))}
                                               className={fieldErrors.cookingMinutes ? "error" : undefined}
                                               onKeyPress={handleKeyPress}
                                               />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="products-container">
                            <p><b>Products list:</b></p>
                            <div className="products-inputs-button-container">
                                <div className="products-inputs-container">
                                    <input
                                        type="text"
                                        placeholder="write product name"
                                        value={productName}
                                        onChange={(e) => setProductName(e.target.value)}
                                    />
                                    <input
                                        type="number"
                                        placeholder="write number"
                                        value={productAmount}
                                        min="0"
                                        onChange={(e) => setProductAmount(Number(e.target.value) || '')}
                                        onKeyPress={handleKeyPress}
                                    />
                                    <input
                                        type="text"
                                        placeholder="write unit"
                                        value={productUnit}
                                        onChange={(e) => setProductUnit(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <button type="button" onClick={handleAddIngredient}>Add product</button>
                                </div>
                            </div>
                            <div onClick={toggleProductListVisibility} className="add-products-list-button">
                                <b>Added Products</b>
                                <div>
                                {isProductListVisible ?
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-caret-up" viewBox="0 0 16 16">
                                        <path
                                            d="M3.204 11h9.592L8 5.519zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659"/>
                                    </svg>
                                    : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                           className="bi bi-caret-down" viewBox="0 0 16 16">
                                        <path
                                            d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659"/>
                                    </svg>
                                }
                                </div>
                            </div>
                            {isProductListVisible && (
                                <div className="added-products-list">
                                    {extendedIngredients.length > 0 ? (
                                        <ul>
                                            {extendedIngredients.map((ingredient, index) => (
                                                <li key={index}>
                                                    {ingredient.nameClean} - {ingredient.amount} {ingredient.unit}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No products added yet</p>
                                    )}
                                </div>
                            )}
                            <div
                                className={fieldErrors.image ? "error-upload-container" : "upload-container"}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={handleDrop}
                                onClick={() => document.getElementById('file-input')?.click()}
                            >
                                <p>Drag and drop a recipe photo here or click to select a file</p>
                                <input
                                    type="file"
                                    id="file-input"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="upload-input"
                                />
                            </div>
                            {image && (
                                <div className="uploaded-image-container">
                                    <p><b>Uploaded Image:</b></p>
                                    <img src={image} alt="Uploaded recipe" className="uploaded-image"/>
                                </div>
                            )}
                        </div>
                        {error && <div className="error-message">{error}</div>}
                        <div className="button-submit-container">
                            <button type="submit">Create</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default CreateCard;
