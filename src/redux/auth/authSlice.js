import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, database } from "../../Firebase/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

const collectionName = "users";

export const createAccountThunk = createAsyncThunk(
  "auth/createAccount",
  async ({ email, password, name, photo }) => {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });

    //Crear o guardar el usuario en la base de datos

    const newUser = {
      id: userCredentials.user.uid,
      displayName: name,
      email: email,
      accessToken: userCredentials.user.accessToken,
      photoURL: photo,
      isAdmin: false,
      //Incluir el resto de la información (o propiedades) que necesiten guardar del usuario
    };

    //Armamos la referencia del nuevo usuario a guarda
    const userRef = doc(database, collectionName, userCredentials.user.uid);
    //Se guarda el usuario con la referencia que se creó en la línea anterior
    await setDoc(userRef, newUser);
    return newUser;
  }
);

export const loginWithEmailAndPassworThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const { user } = await signInWithEmailAndPassword(auth, email, password);

    //Obtener la información del usuario en la base de datos
    const userRef = doc(database, collectionName, user.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      throw new Error("No se encontraron datos del usuario");
    }
  }
);

export const logoutThunk = createAsyncThunk("auth/logout", async () => {
  await signOut(auth);
  return null;
});

export const googleLoginThunk = createAsyncThunk(
  "auth/googleLogin",
  async () => {
    const googleProvider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, googleProvider);

    //Se busca la información del usuario en la base de datos. Si no existe el usuario se crea y si existe se obtiene la información
    let newUser = null;
    const userRef = doc(database, collectionName, user.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      newUser = userDoc.data();
    } else {
      newUser = {
        id: user.uid,
        displayName: user.displayName,
        accessToken: user.accessToken,
        photoURL: user.photoURL,
        email: user.email,
        isAdmin: false,
        //Incluir el resto de la información que deben guardar
        city: null,
      };
      await setDoc(userRef, newUser);
    }

    return newUser;
  }
);

export const loginWithVerificationCodeThunk = createAsyncThunk(
  "auth/loginWithVerificationCode",
  async (code, { rejectWithValue }) => {
    try {
      const confirmationResult = window.confirmationResult;
      if (!confirmationResult) {
        throw new Error("No hay resultado de confirmación disponible");
      }
      const { user } = await confirmationResult.confirm(code);

      //Se busca la información del usuario en la base de datos. Si no existe el usuario se crea y si existe se obtiene la información

      let newUser = null;
      const userRef = doc(database, collectionName, user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        newUser = userDoc.data();
      } else {
        newUser = {
          id: user.uid,
          displayName: user.displayName,
          accessToken: user.accessToken,
          photoURL: user.photoURL,
          email: user.email,
          phoneNumber: user.phoneNumber,
          isAdmin: false,
          //Incluir el resto de la información que deben guardar
          city: null,
        };
        await setDoc(userRef, newUser);
      }

      return newUser;
    } catch (error) {
      return rejectWithValue(error.message || "Error en la verificación");
    }
  }
);

export const restoreActiveSessionThunk = createAsyncThunk(
  "auth/restoreActiveSession",
  async (userId) => {
    const userRef = doc(database, collectionName, userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      throw new Error("Usuario no encontrado");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    restoreSession: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAccountThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAccountThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(createAccountThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loginWithEmailAndPassworThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithEmailAndPassworThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginWithEmailAndPassworThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logoutThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        (state.loading = false), (state.error = action.error.message);
      })
      .addCase(googleLoginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLoginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(googleLoginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loginWithVerificationCodeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithVerificationCodeThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginWithVerificationCodeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(restoreActiveSessionThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(restoreActiveSessionThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(restoreActiveSessionThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

const authReducer = authSlice.reducer;
export default authReducer;

export const { clearError, restoreSession } = authSlice.actions;
