// redux/modalSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isActiveModal: false,
  currentStep: 1, // Empezamos en el paso 1 (BirthdateForm)
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
    }
  }
});

export const { showModal, hiddenModal, nextStep, prevStep, resetStep } = modalSlice.actions;
export default modalSlice.reducer;
