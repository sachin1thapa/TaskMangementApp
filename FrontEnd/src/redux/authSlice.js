import { createSlice } from '@reduxjs/toolkit';
import { getCurrentUserInfo, loginUser, registerUser } from './authAction';

export const STATUSES = Object.freeze({
  IDLE: 'idle',
  LOADING: 'loading',
  ERROR: 'error',
});

// get data from the local storage if present
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userInfo: userInfoFromStorage,
  status: STATUSES.IDLE,
  error: null,
  success: false,
  islogedin: !!userInfoFromStorage, // Check if userInfo is present
};


const handlePending = (state) => {
  state.status = STATUSES.LOADING;
  state.error = null;
  state.success = false;
  state.islogedin = false;
};

const handleFulfilled = (state, action) => {
  state.status = STATUSES.IDLE;
  state.userInfo = action.payload.data;
  state.success = true;
  state.error = null;
  // Set islogedin based on the action type
  console.log(action);
  if (action.type === 'auth/login/fulfilled') {
    state.islogedin = true;
    // action.payload?.data?.user
    //   ? localStorage.setItem('userInfo', JSON.stringify(action.payload.data?.user))
    //   : localStorage.setItem('userInfo', JSON.stringify(action.payload.data));    //
    localStorage.setItem('userInfo', JSON.stringify(action.payload.data?.user));
  } else if (action.type === 'auth/register/fulfilled') {
    console.log('ohh bhai');
    state.islogedin = false; // since we need to get the access token so we set it to false
  } else {
    state.islogedin = true;
  }
};

const handleRejected = (state, { payload }) => {
  state.status = STATUSES.ERROR;
  state.error = payload;
  state.userInfo = null;
  state.success = false;
  state.islogedin = false;

  localStorage.removeItem('userInfo'); // clear the local storage
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // logout action
    logout: (state) => {
      state.userInfo = null;
      state.islogedin = false;
      state.status = STATUSES.IDLE;
      state.error = null;
      state.success = false;

      localStorage.removeItem('userInfo');
    },
  },
  extraReducers: (builder) => {
    // Register User
    builder.addCase(registerUser.pending, handlePending);
    builder.addCase(registerUser.fulfilled, handleFulfilled);
    builder.addCase(registerUser.rejected, handleRejected);

    // Login User
    builder.addCase(loginUser.pending, handlePending);
    builder.addCase(loginUser.fulfilled, handleFulfilled);
    builder.addCase(loginUser.rejected, handleRejected);

    // Get Current User Info
    builder.addCase(getCurrentUserInfo.pending, handlePending);
    builder.addCase(getCurrentUserInfo.fulfilled, handleFulfilled);
    builder.addCase(getCurrentUserInfo.rejected, handleRejected);
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
