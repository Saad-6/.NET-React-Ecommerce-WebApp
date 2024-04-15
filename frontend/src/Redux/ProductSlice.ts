// Define the state first
// Create the slice
//Inside the creation , give a name , give initial value to the state that we defined earlier
// Define reducers , which are basically functions
// Export each reducer function and the reducer as a whole (which will be registered in the main store)
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import ProductModel from "../Interfaces/ProductModel";
import { useGetAllProductsQuery } from "../apis/ProductAPI";
import { useDispatch } from "react-redux";

const inintialState={
 Products:[],

}
export const ProductSlice=createSlice({
name:"Product",
initialState:inintialState,
reducers:{
     
      setProduct:(state,action)=>{
        state.Products=action.payload;
      },
     
     
   
},

});
export const {setProduct} =ProductSlice.actions;
export const ProductReducer=ProductSlice.reducer;

