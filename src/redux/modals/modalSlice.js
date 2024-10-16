import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isActiveModal: false,
    isDropdownOpen: false,
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
        },
        showDropdown: (state) => {
            state.isDropdownOpen = true;
        },
        hideDropdown: (state) => {
            state.isDropdownOpen = false;
        },
    }
});

export const { showModal, hiddenModal, showDropdown, hideDropdown } = modalSlice.actions;
export default modalSlice.reducer;
