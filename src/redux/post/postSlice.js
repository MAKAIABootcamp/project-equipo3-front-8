// postsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { database } from "../../firebase/firebaseConfig";
import {
  collection,
  doc,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { calculateRatings } from "../../utils/reviewsOperations";

const collectionName = "posts";

export const createPostThunk = createAsyncThunk(
  "posts/createPost",
  async ({
    userId,
    restaurantId,
    questions: { firstQuestion, secondQuestion, thirdQuestion },
    postImage,
    description,
    tags,
  }) => {
    const review = calculateRatings({
      firstQuestion,
      secondQuestion,
      thirdQuestion,
      tags,
    });
    const newPost = {
      userId,
      restaurantId,
      postImage,
      description,
      likes: [],
      dislikes: [],
      questions: {
        firstQuestion,
        secondQuestion,
        thirdQuestion,
        tags: [...tags],
      },
      review,
      publicationDate: new Date().toISOString(),
    };

    const postRef = collection(database, collectionName);
    const postDoc = await addDoc(postRef, {
      ...newPost,
      createdAt: serverTimestamp(),
    });
    return {
      id: postDoc.id,
      ...newPost,
      createdAt: new Date().toISOString(),
    };
  }
);

// Thunk para obtener publicaciones desde Firebase
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const postsCollection = collection(database, collectionName);
  const q = query(postsCollection, orderBy("createdAt", "desc"));
  const postsSnapshot = await getDocs(q);
  return postsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate()?.toISOString(),
  }));
});

export const setLikesPost = createAsyncThunk(
  "posts/setLikes",
  async ({ postId, userId, likes }, { rejectWithValue }) => {
    try {
      const isUserExists = likes.some((like) => like === userId);
      const likesArray = isUserExists
        ? likes.filter((like) => like !== userId)
        : [...likes, userId];
      const postRef = doc(database, collectionName, postId);
      await updateDoc(postRef, { likes: [...likesArray] });
      return {
        postId,
        likes: [...likesArray],
      };
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    newPost: {
      userId: "",
      restaurantId: "",
      postImage: "",
      description: "",
      questions: {
        firstQuestion: "",
        secondQuestion: "",
        thirdQuestion: "",
      },
      tags: [],
      likes: [],
      dislikes: [],
    },
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setNewPost: (state, action) => {
      state.newPost = {
        ...state.newPost,
        ...action.payload,
      };
    },
    clearNewPost: (state) => {
      state.newPost = {
        userId: "",
        restaurantId: "",
        postImage: "",
        description: "",
        tags: [],
        likes: [],
        dislikes: [],
      };
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
        state.posts.unshift(action.payload);
      })
      .addCase(createPostThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(setLikesPost.fulfilled, (state, action) => {
        state.posts = state.posts.map((item) =>
          item.id === action.payload.postId
            ? { ...item, likes: action.payload.likes }
            : item
        );
        state.loading = false;
        state.error = null;
      })
      .addCase(setLikesPost.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(setLikesPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
  },
});

export const { clearError, setNewPost, clearNewPost } = postsSlice.actions;
export default postsSlice.reducer;
