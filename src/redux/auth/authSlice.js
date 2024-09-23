import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth} from "../../Firebase/firebaseConfig";


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