import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore';
import { database } from '../../firebase/firebaseConfig'; // Ajusta la ruta según tu estructura

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



export const searchRestaurants = createAsyncThunk(
    'restaurant/search',
    async (searchTerm, { rejectWithValue }) => {
        try {
            const restaurantsRef = collection(database, RESTAURANTS_COLLECTION);

            // Consulta parcial usando `>=` y `<=` para coincidencias parciales
            const q = query(
                restaurantsRef,
                where('displayName', '>=', searchTerm),
                where('displayName', '<=', searchTerm + '\uf8ff')
            );

            const querySnapshot = await getDocs(q);

            // Filtra solo los campos que necesitamos (no datos sensibles)
            const restaurants = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                displayName: doc.data().displayName,
                location: doc.data().location, // Solo la ciudad o datos públicos
            }));

            return restaurants;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


// Función para verificar si ya existe un restaurante
const checkRestaurantExists = async (restaurantName, city, address) => {
    const restaurantsRef = collection(database, RESTAURANTS_COLLECTION);
    const q = query(restaurantsRef,
        where('displayName', '==', restaurantName),
        where('location.city', '==', city),
        where('location.address', '==', address)
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty; // Retorna true si ya existe
};

const generateUniqueUsername = async (baseUsername) => {
    let username = baseUsername;
    let counter = 1;

    const restaurantsRef = collection(database, RESTAURANTS_COLLECTION);
    const existingUsernames = new Set(); // Usar un Set para almacenar nombres existentes

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
// Acción para crear un nuevo restaurante
export const createRestaurantOnReview = createAsyncThunk(
    'restaurant/create',
    async ({ restaurantName, city, address }, { rejectWithValue }) => {
        try {
            // Verifica si el restaurante ya existe
            const restaurantExists = await checkRestaurantExists(restaurantName, city, address);
            if (restaurantExists) {
                return rejectWithValue('El restaurante ya existe en esta ubicación.');
            }

            // Espera a que se genere un username único
            const username = await generateUniqueUsername(restaurantName); // Asegúrate de que la promesa esté resuelta

            // Crea el restaurante en Firestore
            const restaurantRef = collection(database, RESTAURANTS_COLLECTION);
            const newRestaurantRef = await addDoc(restaurantRef, {
                username, // Ya resuelto
                displayName: restaurantName,
                email: '', // Dejar en blanco por ahora
                phone: {
                    countryCodeId: '', // Dejar en blanco
                    number: '' // Dejar en blanco
                },
                userAvatar: 'default-avatar-url',
                accessToken: '',
                location: {
                    city,
                    address,
                    country: '',
                    state: '',
                },
                ...defaultRestaurantData // Agrega los campos opcionales
            });

            return { id: newRestaurantRef.id, restaurantName, city, address };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


// Reducer para el slice
const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState: {
        restaurants: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(searchRestaurants.pending, (state) => {
                state.loading = true;
            })
            .addCase(searchRestaurants.fulfilled, (state, action) => {
                state.loading = false;
                state.restaurants = action.payload;
            })
            .addCase(searchRestaurants.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createRestaurantOnReview.pending, (state) => {
                state.loading = true;
            })
            .addCase(createRestaurantOnReview.fulfilled, (state, action) => {
                state.loading = false;
                state.restaurants.push(action.payload);
            })
            .addCase(createRestaurantOnReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// Selectores para acceder a los datos del estado
export const selectAllRestaurants = (state) => state.restaurant.restaurants;
export const selectLoading = (state) => state.restaurant.loading;
export const selectError = (state) => state.restaurant.error;

export default restaurantSlice.reducer;