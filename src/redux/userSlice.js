import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
  userExpenses: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    processData: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      return initialState;
    },
    updateUserExpenseList: (state, action) => {
      state.loading = false;
      state.userExpenses = action.payload;
    },
  },
});

export const {
  processData,
  loginSuccess,
  loginFailure,
  logout,
  updateUserExpenseList,
} = userSlice.actions;

export default userSlice.reducer;
