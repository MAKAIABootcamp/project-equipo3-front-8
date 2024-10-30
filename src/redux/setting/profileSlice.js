import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    userType: 'normal',
    profilePhoto: null,
    coverPhoto: null,
    bio: '',
    website: '',
    gender: '',
    notificationsEnabled: true,
    restaurantInfo: { menu: '', hours: '', location: '' },
  },
  reducers: {
    setProfileData: (state, action) => {
      return { ...state, ...action.payload };
    },
    setUserType: (state, action) => {
      state.userType = action.payload;
    },
  },
});

export const { setProfileData, setUserType } = profileSlice.actions;
export default profileSlice.reducer;
