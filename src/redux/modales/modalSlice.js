import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isActiveModal: false
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        showModal: (state) => {
            state.isActiveModal = true;
        },
        hiddenModal: (state) => {
            state.isActiveModal = false;
        }
    }
});

export const { showModal, hiddenModal } = modalSlice.actions;
export default modalSlice.reducer;
