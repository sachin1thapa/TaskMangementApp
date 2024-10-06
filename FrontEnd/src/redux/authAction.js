import axios, { axiosPrivate } from '@/api/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Register User
const registerUser = createAsyncThunk('auth/register', async (payload, { rejectWithValue }) => {
  try {
    const { data: Userdata } = await axios.post('/users/register', payload);
    console.log(Userdata);

    if (!Userdata || !Userdata.data) {
      return rejectWithValue('Invalid registration response.');
    }

    return Userdata;
  } catch (error) {
    return handleError(error, rejectWithValue);
  }
});

// Login User
const loginUser = createAsyncThunk('auth/login', async (payload, { rejectWithValue }) => {
  try {
    const { data: Userdata } = await axiosPrivate.post('/users/login', payload);
    if (!Userdata || !Userdata.data || !Userdata.data.accessToken) {
      return rejectWithValue('Invalid login response.');
    }

    return Userdata;
  } catch (error) {
    return handleError(error, rejectWithValue);
  }
});

// Get Current User Info
const getCurrentUserInfo = createAsyncThunk('auth/userinfo', async (_, { rejectWithValue }) => {
  try {
    const { data: Userdata } = await axiosPrivate.get('/users/current-user');

    if (!Userdata || !Userdata.data) {
      return rejectWithValue('Invalid user info response.');
    }

    return Userdata;
  } catch (error) {
    return handleError(error, rejectWithValue);
  }
});

// Handle errors consistently
const handleError = (error, rejectWithValue) => {
  if (error.response && error.response.data && error.response.data.message) {
    return rejectWithValue(error.response.data.message);
  }
  return rejectWithValue(error.message);
};

export { registerUser, loginUser, getCurrentUserInfo };
