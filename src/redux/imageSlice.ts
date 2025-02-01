import { createSlice } from '@reduxjs/toolkit';

const imageSlice = createSlice({
    name: 'image',
    initialState: {
        image: ''
    },
    reducers: {
        uploadImage: (state, action) => {
            state.image = action.payload; // Здесь payload должен быть URL
        },
    },
});

export const { uploadImage } = imageSlice.actions;
export default imageSlice.reducer;
