import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import modalReducer from "./modals/modalSlice";
import postReducer from "./post/postSlice";
import otherUserReducer from "./users/otherUserSlice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        modal: modalReducer,
        posts: postReducer,
        otherUser: otherUserReducer,
    },

})

export default store;