import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import modalReducer from "./modales/modalSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        modal: modalReducer
    },

})

export default store;