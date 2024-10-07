import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoginModalOpen: false,
    activeSubModal: null // 'email', 'phone', 'google', 'facebook', 'register'
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openLoginModal: (state) => {
            state.isLoginModalOpen = true;
        },
        closeLoginModal: (state) => {
            state.isLoginModalOpen = false;
            state.activeSubModal = null;
        },
        setActiveSubModal: (state, action) => {
            state.activeSubModal = action.payload;
        }
    }
});

export const { openLoginModal, closeLoginModal, setActiveSubModal } = modalSlice.actions;
export default modalSlice.reducer;
