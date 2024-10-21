import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { database } from '../../firebase/firebaseConfig';

// Función para filtrar datos sensibles
const filterSensitiveData = (userData) => {
  const { accessToken, email, createdAt, followers, following, themePreference, notificationsEnabled, lastConnection, eatingOutFrecuency, ...filteredData } = userData; // Excluir accessToken
  return filteredData;
};

// Thunk para obtener los datos de otro usuario por username
export const fetchOtherUserData = createAsyncThunk(
  'otherUser/fetchData',
  async (username, { rejectWithValue }) => {
    try {
      const usersCollectionRef = collection(database, 'users');
      const q = query(usersCollectionRef, where('username', '==', username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        return { id: userDoc.id, ...filterSensitiveData(userData) }; // Filtrar datos sensibles antes de devolverlos
      } else {
        return rejectWithValue('Usuario no encontrado');
      }
    } catch (error) {
      return rejectWithValue('Error al obtener los datos del usuario');
    }
  }
);


const otherUserSlice = createSlice({
  name: 'otherUser',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearOtherUserData(state) {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOtherUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOtherUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchOtherUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error desconocido'; // Maneja el error
      });
  },
});

// Exporta las acciones y el reductor
export const { clearOtherUserData } = otherUserSlice.actions;
export default otherUserSlice.reducer;
