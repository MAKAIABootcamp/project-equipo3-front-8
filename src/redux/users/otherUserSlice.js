import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { database } from '../../firebase/firebaseConfig'; // Importa la configuración de Firebase
import { doc, getDoc } from 'firebase/firestore';

// Thunk para obtener los datos de otro usuario
export const fetchOtherUserData = createAsyncThunk(
  'otherUser/fetchData',
  async (username) => {
    const userRef = doc(database, 'users', username); // Ajusta según la estructura de tu colección
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return { id: userSnap.id, ...userSnap.data() }; // Devuelve los datos del usuario
    } else {
      throw new Error('Usuario no encontrado'); // Lanza un error si el usuario no existe
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
        state.error = action.error.message; // Maneja el error
      });
  },
});

// Exporta las acciones y el reductor
export const { clearOtherUserData } = otherUserSlice.actions;
export default otherUserSlice.reducer;
