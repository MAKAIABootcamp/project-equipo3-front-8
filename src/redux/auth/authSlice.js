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
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import axios from "axios";
import { generateUniqueUsername } from "../../utils/usernameGenerator";

const collectionName = "users";

const defaultUserData = {
  userDescription: "",
  location: {
    city: "",
    country: "",
    state: "",
    street: "",
  },
  birthday: null,
  website: "",
  userBanner: null,
  stories: [],
  reviewCount: 0,
  likesCount: 0,
  followers: [],
  following: [],
  eatingOutFrecuency: "",
  interests: [],
  isAdmin: false,
  accountType: "normal",
  themePreference: "light",
  notificationsEnabled: true,
  isOnline: false,
  lastConnection: null,
  createdAt: new Date().toISOString(),
};

// Función auxiliar para obtener o crear un usuario
const getOrCreateUser = async (user, userRef) => {
  const userDoc = await getDoc(userRef);
  let newUser;

  if (userDoc.exists()) {
    newUser = userDoc.data();
  } else {
    const username = await generateUniqueUsername(
      user.displayName || "usuario"
    );
    newUser = {
      id: user.uid,
      username,
      displayName: user.displayName,
      email: user.email,
      userAvatar: user.photoURL,
      accessToken: user.accessToken,
      ...defaultUserData,
    };
    await setDoc(userRef, newUser);
  }

  return newUser;
};

export const updateUserPreferences = createAsyncThunk(
  "auth/updateUserPreferences",
  async ({ preference, updateData, userId }, { rejectedWithValue }) => {
    const user = {};
    user[preference] = updateData;
    try {
      const userRef = doc(database, collectionName, userId);
      await updateDoc(userRef, user);
      return user;
    } catch (error) {
      console.error(error);
      return rejectedWithValue(error.message);
    }
  }
);

export const createAccountThunk = createAsyncThunk(
  "auth/createAccount",
  async ({
    email,
    password,
    name = null,
    photo = null,
    username,
    birthday,
  }) => {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // await updateProfile(auth.currentUser, {
    //   displayName: name,
    //   photoURL: photo,
    // });

    //Crear o guardar el usuario en la base de datos

    const newUser = {
      id: userCredentials.user.uid,
      username, // Usa el username proporcionado por el input
      displayName: name,
      email, // Usa el email proporcionado por el input
      userAvatar: photo,
      accessToken: userCredentials.user.accessToken,
      ...defaultUserData, // Expande el objeto con los valores predeterminados
      birthday,
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
    const result = await signInWithPopup(auth, googleProvider);
    const userRef = doc(database, collectionName, result.user.uid);
    const user = await getOrCreateUser(result.user, userRef);

    return user;
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
      const userRef = doc(database, collectionName, user.uid);
      return await getOrCreateUser(user, userRef);
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

      const userRef = doc(database, collectionName, result.user.uid);
      const user = await getOrCreateUser(result.user, userRef);

      return user;
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
    birthday: null,
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
    setUserBirthday: (state, action) => {
      state.birthday = action.payload;
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
      }).addCase(updateUserPreferences.fulfilled,(state,action)=>{
        state.loading = false;
        state.user ={
          ...state.user,
          ...action.payload
        }
      }).addCase(updateUserPreferences.rejected, (state,action)=>{
        state.loading = false;
        state.error = action.payload;
      })
  },
});

const authReducer = authSlice.reducer;
export default authReducer;

export const { clearError, restoreSession, setUserBirthday } =
  authSlice.actions;
