import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { database } from '../../firebase/firebaseConfig'; // Importa Firestore
import { doc, updateDoc } from 'firebase/firestore';
import uploadFile from '../../services/uploadFile'; // Importa el servicio de subida a Cloudinary

// Thunk para actualizar datos del perfil en Firestore
export const updateUserProfile = createAsyncThunk(
  'profile/updateUserProfile',
  async (userData, { getState }) => {
    const { user } = getState().auth;
    const userRef = doc(database, 'users', user.uid);

    // Actualiza los datos en Firestore
    await updateDoc(userRef, userData);
    return userData;
  }
);

// Thunk para subir imagen a Cloudinary y actualizar URL en Firestore
export const uploadImageAndUpdateProfile = createAsyncThunk(
  'profile/uploadImageAndUpdateProfile',
  async ({ file, imageType }, { getState }) => {
    const { user } = getState().auth;

    // Subir el archivo a Cloudinary
    const imageUrl = await uploadFile(file);

    // Actualizar la URL de la imagen en Firestore
    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, { [imageType]: imageUrl });

    return { imageType, url: imageUrl };
  }
  
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    displayName: '',
    username: '',
    userDescription: '',
    website: '',
    birthday: '',
    gender: '',
    location: {
      city: '',
      country: '',
      state: '',
      street: '',
    },
    interests: [],
    notificationsEnabled: true,
    avatar: '',
    banner: '',
  },
  reducers: {
    setProfileData: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
      })
      .addCase(uploadImageAndUpdateProfile.fulfilled, (state, action) => {
        const { imageType, url } = action.payload;
        state[imageType] = url;
      });
  },
});

export const { setProfileData } = profileSlice.actions;
export default profileSlice.reducer;
