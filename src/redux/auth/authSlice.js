import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, database } from "../../Firebase/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import axios from "axios";
import { generateUniqueUsername } from "../../utils/usernameGenerator"

const collectionName = "users";

export const createAccountThunk = createAsyncThunk(
  "auth/createAccount",
  async ({ email, password, name, photo, username }) => {
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
      username: username,
      displayName: name,
      email: email,
      photoURL: photo,
      isAdmin: false,
      accessToken: userCredentials.user.accessToken,
      //Incluir el resto de la información (o propiedades) que necesiten guardar del usuario
    };

    //Armamos la referencia del nuevo usuario a guarda
    const userRef = doc(database, collectionName, userCredentials.user.uid);
    //Se guarda el usuario con la referencia que se creó en la línea anterior
    await setDoc(userRef, newUser);
    return newUser;
  }
);

export const loginWithEmailAndPasswordThunk = createAsyncThunk(
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
    const username = await generateUniqueUsername(user.displayName);
    let newUser = null;
    const userRef = doc(database, collectionName, user.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      newUser = userDoc.data();
    } else {
      newUser = {
        id: user.uid,
        username: username,
        displayName: user.displayName,
        email: user.email,
        city: null,
        photoURL: user.photoURL,
        isAdmin: false,
        //Incluir el resto de la información que deben guardar
        accessToken: user.accessToken,
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
          email: user.email,
          phoneNumber: user.phoneNumber,
          //Incluir el resto de la información que deben guardar
          city: null,
          photoURL: user.photoURL,
          isAdmin: false,
          accessToken: user.accessToken,
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

export const loginWithFacebookThunk = createAsyncThunk(
  "auth/loginWithFacebook",
  async (_, { rejectWithValue }) => {
    const provider = new FacebookAuthProvider();
    provider.addScope("public_profile");
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;

      const response = await axios.get(
        `https://graph.facebook.com/v20.0/me?fields=id,name,picture.type(large)&access_token=${accessToken}`
      );
      if (
        response.data &&
        response.data.picture &&
        response.data.picture.data &&
        response.data.picture.data.url
      ) {
        await updateProfile(auth.currentUser, {
          photoURL: response.data.picture.data.url,
        });
      }

      //Se busca la información del usuario en la base de datos. Si no existe el usuario se crea y si existe se obtiene la información
      const username = await generateUniqueUsername(result.user.displayName);
      let newUser = null;
      const userRef = doc(database, collectionName, result.user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        newUser = userDoc.data();
      } else {
        newUser = {
          id: result.user.uid,
          username: username,
          displayName: result.user.displayName,
          email: result.user.email,
          
          //Incluir el resto de la información que deben guardar
          city: null,
          photoURL: response.data?.picture?.data?.url
          ? response.data.picture.data.url
          : result.user.photoURL,
          isAdmin: false,
          accessToken,
        };
        await setDoc(userRef, newUser);
      }

      return newUser;
    } catch (error) {
      
      console.error(error);
      return rejectWithValue(error.message);
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
      .addCase(loginWithEmailAndPasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithEmailAndPasswordThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginWithEmailAndPasswordThunk.rejected, (state, action) => {
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
      })
      .addCase(loginWithFacebookThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginWithFacebookThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithFacebookThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const authReducer = authSlice.reducer;
export default authReducer;

export const { clearError, restoreSession } = authSlice.actions;
