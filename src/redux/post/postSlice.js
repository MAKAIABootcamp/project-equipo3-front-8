// postsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { database } from '../../firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const collectionName = 'posts';

export const createPostThunk = createAsyncThunk(
  "posts/createPost",
  async ({
    userId,
    restaurantId,
    firstQuestion,
    secondQuestion,
    thirdQuestion,
    // userPhoto,
    // username,
    // reviewCount,
    // restaurantName,
    // restaurantCity,
    // restaurantImage,
    postImage,
    description,
    tags,
    // likesCount,
    // postValue,
  }) => {
    // const postId = Date.now(); // Puedes usar un ID único, aquí usamos la fecha actual
    //Función que reciba un objeto como este:{
    //   firstQuestion,
    //   secondQuestion,
    //   thirdQuestion,
    //   tags: [...tags],
    // } y nos retorne un {foodQuality,service,ambience,valueForMoney}

    const newPost = {
      // id: postId,
      userId,
      restaurantId,
      // userPhoto,
      // username,
      // reviewCount,
      // restaurantName,
      // restaurantCity,
      // restaurantImage,
      postImage,
      description,
      // tags,
      likes: [],
      dislikes: [],
      postValue: {
        firstQuestion,
        secondQuestion,
        thirdQuestion,
        tags: [...tags],
      },
      // review:{foodQuality,service,ambience,valueForMoney},
      publicationDate: new Date().toISOString(),
    };

    const postRef = collection(database, collectionName);
    const postDoc = await addDoc(postRef, newPost);
    return {
      id: postDoc.id,
      ...newPost,
    }; // Retorna el nuevo post para actualizar el estado
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPostThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPostThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload); // Añadir el nuevo post al estado
      })
      .addCase(createPostThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearError } = postsSlice.actions;
export default postsSlice.reducer;
