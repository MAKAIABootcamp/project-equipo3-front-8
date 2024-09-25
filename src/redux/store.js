import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";


const store = configureStore({
    reducer: {
        auth: authReducer,
        restaurants: restaurantsReducer
    },

})

export default store;