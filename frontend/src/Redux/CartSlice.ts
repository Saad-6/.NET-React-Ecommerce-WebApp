import { createSlice } from "@reduxjs/toolkit";
const inintialState={
 cartItems:[],

}
export const CartSlice=createSlice({
name:"Product",
initialState:inintialState,
reducers:{
     
      setCart:(state,action)=>{
        state.cartItems=action.payload;
      }
},

});
export const {setCart} =CartSlice.actions;
export const CartReducer=CartSlice.reducer;