import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import modalReducer from "./modals/modalSlice";
import postReducer from "./post/postSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        modal: modalReducer,
        posts: postReducer,
    },

})

export default store;