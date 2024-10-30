import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import modalReducer from "./modals/modalSlice";
import postReducer from "./post/postSlice";
import otherUserReducer from "./users/otherUserSlice"
import restaurantReducer from "./restaurants/restaurantSlice"
import authRestaurantReducer from "./auth/authRestaurantSlice"
import userReducer from "./setting/userSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        modal: modalReducer,
        posts: postReducer,
        otherUser: otherUserReducer,
        restaurant: restaurantReducer,
        authRestaurant: authRestaurantReducer,
        user: userReducer,
    },

})

export default store;