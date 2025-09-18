import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ups: 
  [
    {
      product: {id: null, name:""},
      batteries: []
    }
  ]
  
}

const productBatteriesSlice = createSlice({
  name: 'productBatteries',
  initialState,
  reducers:{
    setProductBatteries(state, action){
      return{...state, ...action.payload};
    },
    resetProductBatteries(){
      return initialState;
    },
  },
});

export const {setProductBatteries, resetProductBatteries} = productBatteriesSlice.actions;
export default productBatteriesSlice.reducer;