import { createSlice } from "@reduxjs/toolkit";

const initialState = {

  brand: '',
  model: '',
  serial: '',
  deviceImages: [],

}

const supportDeviceSlice = createSlice({
  name: 'supportDevice',
  initialState,
  reducers: {
    setSupportDevice(state, action) {
      return{...state, ...action.payload};
    },
    resetSupportDevice(){
      return initialState;
    },
  },
});
export const { setSupportDevice, resetSupportDevice } = supportDeviceSlice.actions;
export default supportDeviceSlice.reducer;