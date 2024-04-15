import {configureStore} from "@reduxjs/toolkit";
import { userReducer } from "./UserSlice";
import { ProductReducer } from "./ProductSlice";
import ProductApi from "../apis/ProductAPI";
import AuthAPI from "../apis/AuthAPI";
import CartAPI from "../apis/CartAPI";
import OrderAPI from "../apis/OrderAPI";
// In reducer define all the reducers of each slice

const store=configureStore({
    reducer:{
        UserStore:userReducer,
        ProductStore:ProductReducer,
        [ProductApi.reducerPath]:ProductApi.reducer,
        [AuthAPI.reducerPath]:AuthAPI.reducer,
        [CartAPI.reducerPath]:CartAPI.reducer,
        [OrderAPI.reducerPath]:OrderAPI.reducer,

    }, 
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware()
    .concat(ProductApi.middleware)
    .concat(AuthAPI.middleware)
    .concat(CartAPI.middleware)
    .concat(OrderAPI.middleware)
    ,
    
    })
    // Have to export the type because we are using typescript
    export type RootState = ReturnType<typeof store.getState>;
    export default store;
  