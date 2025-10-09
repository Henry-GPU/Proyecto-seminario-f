import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  username: '',
  fullName: '',
  phone: '',
  email: '',
  password: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return{...state, ...action.payload};
    },
    resetUser(){
      return initialState;
    },
  },
});
export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;