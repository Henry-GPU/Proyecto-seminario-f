import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import saleReducer from './saleSlice';
import productBatteriesReducer from './ProductBatteriesSlice';
import productUpdReducer from './productUpdSlice';
import userReducer from './UserSlice'
import customerReducer from './CustomerSlice';
import supportDeviceReducer from './SupportDeviceSlice';

export const store = configureStore({
    reducer: {
        product: productReducer,
        sale: saleReducer,
        productBateries: productBatteriesReducer,
        productUpd: productUpdReducer,
        user: userReducer,
        customer: customerReducer,
        supportDevice: supportDeviceReducer,
    },
});
