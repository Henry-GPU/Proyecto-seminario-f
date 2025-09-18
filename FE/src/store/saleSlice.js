import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  seller: {id: null, name: ''},
  customer: {id: null, name: ''},
  total: 0,
  address: {id: null, addressLine: '', city: '', state: ''},
  products:[]
}

const saleSlice = createSlice({
  name: 'sale',
  initialState,
  reducers: {
    setSale(state, action){
      return{...state,...action.payload};
    },
    addProduct(state, action){
      state.products.push(action.payload);
    },
    removeProduct(state, action) {
      const productToRemove = state.products.find(
        (product) =>
          product.product === action.payload.product &&
          product.price === action.payload.price
      );
    
      if (productToRemove) {
        state.total -= productToRemove.price * productToRemove.cant;
    
        // Asegúrate de usar los mismos criterios en el filter
        state.products = state.products.filter(
          (product) =>
            !(
              product.product === action.payload.product &&
              product.price === action.payload.price
            )
        );
      }
    },
    resetSale(){
      return initialState;
    },
  },
});

export const {setSale, resetSale, addProduct, removeProduct} = saleSlice.actions;
export default saleSlice.reducer;