import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  code: '',
  name: '',
  description: '',
  price: 0,
  recomendedPrice: 0,
  stock: 0,
  store: {id: null, name: ''},
  category: {id: null, name: ''},
  brand: {id: null, name: ''},
  model: {id: null, name: ''},
  productSpecifications: [],
  productSerials: [],
  productImages: [],

}

const productSlice = createSlice({
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
export const { setProduct, resetProduct } = productSlice.actions;
export default productSlice.reducer;