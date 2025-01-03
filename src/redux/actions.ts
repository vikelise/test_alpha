// actions.ts
import { ADD_PRODUCT, TOGGLE_LIKE, DELETE_PRODUCT } from './types';

export const addProduct = (product: { title: string; description: string; image: string }) => ({
    type: ADD_PRODUCT,
    payload: product,
});

export const toggleLike = (id: number) => ({
    type: TOGGLE_LIKE,
    payload: id,
});

export const deleteProduct = (id: number) => ({
    type: DELETE_PRODUCT,
    payload: id,
});
