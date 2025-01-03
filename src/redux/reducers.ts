// reducers.ts
import { ADD_PRODUCT, TOGGLE_LIKE, DELETE_PRODUCT } from './types';

const initialState = {
    products: [] as Array<{ id: number; title: string; description: string; image: string; isLiked: boolean }>,
};

const productReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ADD_PRODUCT:
            return {
                ...state,
                products: [...state.products, { ...action.payload, id: Date.now(), isLiked: false }],
            };
        case TOGGLE_LIKE:
            return {
                ...state,
                products: state.products.map(product =>
                    product.id === action.payload ? { ...product, isLiked: !product.isLiked } : product
                ),
            };
        case DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(product => product.id !== action.payload),
            };
        default:
            return state;
    }
};

export default productReducer;
