import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth, database } from '../../firebase/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc, getDocs, collection, query, where } from 'firebase/firestore';

// Nombre de la colección
const RESTAURANTS_COLLECTION = 'restaurants';

// Estructura por defecto para los restaurantes
const defaultRestaurantData = {
  userDescription: "",
  birthday: null,
  website: "",
  userBanner: null,
  stories: [],
  reviewCount: 0,
  likesCount: 0,
  followers: [],
  following: [],
  typeofrestaurant: [],
  culinaryStyle: [],
  earlyBooking: false,
  restaurantMenu: [],
  homeService: false,
  restaurantFeatures: [],
  socialMedia: {
    facebook: "",
    instagram: "",
    twitter: ""
  },
  isVerified: false,
  isDelegated: false,
  accountType: "restaurant",
  themePreference: "light",
  notificationsEnabled: true,
  geolocation: {
    latitude: 0.0,
    longitude: 0.0
  },
  isOnline: false,
  lastConnection: new Date().toISOString(),
  createdAt: new Date().toISOString(),
};

// Función para generar un nombre de usuario único
const generateUniqueUsername = async (baseUsername) => {
  let username = baseUsername;
  let counter = 1;

  const restaurantsRef = collection(database, RESTAURANTS_COLLECTION);
  const existingUsernames = new Set();

  // Consulta para obtener todos los nombres de usuario existentes
  const querySnapshot = await getDocs(restaurantsRef);
  querySnapshot.forEach((doc) => {
    existingUsernames.add(doc.data().username);
  });

  // Generar un nombre de usuario único
  while (existingUsernames.has(username)) {
    username = `${baseUsername}_${counter}`;
    counter += 1;
  }

  return username;
};

// Función para verificar si el restaurante ya existe
const verifyRestaurantExists = async (restaurantData) => {
  const { displayName, email } = restaurantData;

  const restaurantsRef = collection(database, RESTAURANTS_COLLECTION);

  // Puedes elegir buscar por nombre de usuario, nombre o correo
  const usernameQuery = query(restaurantsRef, where("username", "==", displayName));
  const emailQuery = query(restaurantsRef, where("email", "==", email));

  const existingByUsernameSnap = await getDocs(usernameQuery);
  const existingByEmailSnap = await getDocs(emailQuery);

  return existingByUsernameSnap.size > 0 || existingByEmailSnap.size > 0;
};

// Thunk para registrar un restaurante
export const registerRestaurant = createAsyncThunk(
  'authRestaurant/registerRestaurant',
  async ({ email, password, restaurantData }, thunkAPI) => {
    try {
      // Validación de entrada
      const { displayName, location } = restaurantData;
      if (!displayName || !location || !email || !password) {
        return thunkAPI.rejectWithValue('Todos los campos son obligatorios.');
      }

      // Verificar si el restaurante ya existe
      const exists = await verifyRestaurantExists(restaurantData);
      if (exists) {
        return thunkAPI.rejectWithValue('El restaurante ya existe.');
      }

      // Crear nuevo usuario
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Generar un nombre de usuario único
      const username = await generateUniqueUsername(displayName);

      // Guardar los datos del restaurante en Firestore
      const restaurantRef = doc(database, RESTAURANTS_COLLECTION, user.uid);
      await setDoc(restaurantRef, {
        username: username,
        displayName, // Añade el nombre del restaurante
        email: user.email,
        accessToken: user.accessToken, // Guardar el accessToken del usuario
        phone: {
          countryCodeId: '', // Dejar en blanco
          number: '' // Dejar en blanco
        },
        userAvatar: 'default-avatar-url',
        location: {
          city: location.city,
          address: location.address,
          country: location.country || '',
          state: location.state || '',
        },
        ...defaultRestaurantData, // Agrega campos opcionales
      });

      return { id: user.uid, email: user.email, username, ...restaurantData };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Thunk para iniciar sesión como restaurante
export const loginRestaurant = createAsyncThunk(
  'authRestaurant/loginRestaurant',
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Obtener los datos del restaurante
      const restaurantRef = doc(database, RESTAURANTS_COLLECTION, user.uid);
      const restaurantSnap = await getDoc(restaurantRef);
      if (restaurantSnap.exists()) {
        return { id: user.uid, email: user.email, ...restaurantSnap.data() };
      } else {
        throw new Error('Restaurante no encontrado');
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Reducer para el slice
const authRestaurantSlice = createSlice({
  name: 'authRestaurant',
  initialState: {
    restaurant: null,
    loading: false,
    error: null,
  },
  reducers: {
    logoutRestaurant(state) {
      state.restaurant = null;
    },
  },
  extraReducers: (builder) => {
    // Registro de restaurante
    builder.addCase(registerRestaurant.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerRestaurant.fulfilled, (state, action) => {
      state.loading = false;
      state.restaurant = action.payload;
    });
    builder.addCase(registerRestaurant.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Inicio de sesión del restaurante
    builder.addCase(loginRestaurant.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginRestaurant.fulfilled, (state, action) => {
      state.loading = false;
      state.restaurant = action.payload;
    });
    builder.addCase(loginRestaurant.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { logoutRestaurant } = authRestaurantSlice.actions;

export default authRestaurantSlice.reducer;
