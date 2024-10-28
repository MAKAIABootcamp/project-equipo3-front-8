
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isActiveModal: false,
  currentStep: 1, // Empezamos en el paso 1 
  isDropdownOpen: false,
  image: null,
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
    nextStep: (state) => {
      state.currentStep += 1; // Incrementar paso
    },
    prevStep: (state) => {
      state.currentStep -= 1; // Retroceder paso
    },
    resetStep: (state) => {
      state.currentStep = 1; // Reiniciar paso
    },
    setStep:(state,action)=>{
      state.currentStep = action.payload;
    },
    showDropdown: (state) => {
      state.isDropdownOpen = true;
    },
    hideDropdown: (state) => {
      state.isDropdownOpen = false;
    },
    setImage: (state, action) => {
      state.image = action.payload;
    },
  }
});

export const { showModal, hiddenModal, nextStep, prevStep, resetStep, showDropdown, hideDropdown, setStep, setImage  } = modalSlice.actions;
export default modalSlice.reducer;
