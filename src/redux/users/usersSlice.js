// src/redux/users/usersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { database } from "../../Firebase/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { linkWithCredential } from "firebase/auth";

// Thunk para obtener datos del usuario
export const fetchUserData = createAsyncThunk(
  "users/fetchUserData",
  async (userId) => {
    const userRef = doc(database, "users", userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      return { id: userDoc.id, ...userDoc.data() }; // Incluir el ID del documento
    }
    throw new Error("Usuario no encontrado");
  }
);

// Thunk para actualizar los datos del usuario
export const updateUserProfile = createAsyncThunk(
  "users/updateUserProfile",
  async ({ userId, profileData }) => {
    const userRef = doc(database, "users", userId);
    await setDoc(userRef, profileData, { merge: true });
    return { id: userId, ...profileData }; // Devolver el ID junto con los datos actualizados
  }
);

// Thunk para vincular una cuenta existente con otro proveedor
export const linkAccountWithProvider = createAsyncThunk(
  "users/linkAccountWithProvider",
  async ({ user, providerCredential }) => {
    await linkWithCredential(user, providerCredential);
    const userRef = doc(database, "users", user.uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      return { id: userDoc.id, ...userDoc.data() }; // Actualiza el usuario autenticado con la nueva información
    }
    throw new Error("Error al vincular el proveedor con la cuenta existente");
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    user: {
      data: null, // Usuario autenticado
      loading: false,
      error: null,
    },
    otherUser: {
      data: null, // Usuario cuyas datos se están visualizando
      loading: false,
      error: null,
    },
  },
  reducers: {
    clearUserError: (state) => {
      state.user.error = null;
    },
    setUser: (state, action) => {
      state.user.data = action.payload; // Actualiza el usuario autenticado
    },
    clearUser: (state) => {
      state.user.data = null; // Limpia el usuario autenticado
    },
    setOtherUser: (state, action) => {
      state.otherUser.data = action.payload; // Actualiza el otro usuario
    },
    clearOtherUser: (state) => {
      state.otherUser.data = null; // Limpia el otro usuario
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.otherUser.loading = true;
        state.otherUser.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.otherUser.loading = false;
        state.otherUser.data = action.payload; // Almacena los datos del otro usuario
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.otherUser.loading = false;
        state.otherUser.error = action.error.message; // Maneja el error
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.user.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user.loading = false;
        state.user.data = { ...state.user.data, ...action.payload }; // Actualiza el estado del usuario autenticado
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.user.loading = false;
        state.user.error = action.error.message; // Maneja el error
      })
      .addCase(linkAccountWithProvider.pending, (state) => {
        state.user.loading = true;
      })
      .addCase(linkAccountWithProvider.fulfilled, (state, action) => {
        state.user.loading = false;
        state.user.data = { ...state.user.data, ...action.payload }; // Actualiza el usuario autenticado con la nueva información
      })
      .addCase(linkAccountWithProvider.rejected, (state, action) => {
        state.user.loading = false;
        state.user.error = action.error.message; // Maneja el error
      });
  },
});

// Exportación de las acciones y el reductor
export const {
  clearUserError,
  setUser,
  clearUser,
  setOtherUser,
  clearOtherUser,
} = usersSlice.actions;

export default usersSlice.reducer;
