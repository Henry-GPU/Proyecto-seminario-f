import { createSlice } from "@reduxjs/toolkit";

const initialState = {

}

const productUpdSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct(state, action) {
      return{...state, ...action.payload};
    },
    resetProduct(){
      return initialState;
    },
  },
});
export const { setProduct, resetProduct } = productUpdSlice.actions;
export default productUpdSlice.reducer;