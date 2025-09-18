import { createSlice } from "@reduxjs/toolkit";

const initialState = {

  id_cliente: null,
  nombres: '',
  apellidos: '',
  nit: '',
  telefono: '',
  email: '',
  direccion: '',
  zona: '',
  ciudad: '',
  departamento: '',

}

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setCustomer(state, action) {
      return{...state, ...action.payload};
    },
    resetCustomer(){
      return initialState;
    },
  },
});
export const { setCustomer, resetCustomer } = customerSlice.actions;
export default customerSlice.reducer;