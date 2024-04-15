// Define the state first
// Create the slice
//Inside the creation , give a name , give initial value to the state that we defined earlier
// Define reducers , which are basically functions
// Export each reducer function and the reducer as a whole (which will be registered in the main store)
import { createSlice } from "@reduxjs/toolkit";
import UserModel from "../Interfaces/UserModel";
export const UserState:UserModel={
  fullName:"",
  id:"",
  userName:"",
  email:"",
  role:"",
}
export const userSlice=createSlice({
name:"User",
initialState:UserState,
reducers:{
     
      setUserState(state,action){
        state.fullName=action.payload.fullName;
        state.userName=action.payload.userName;
        state.email=action.payload.email;
        state.id=action.payload.id;
        state.role=action.payload.role
      },

},

});
export const {setUserState} =userSlice.actions;
export const userReducer=userSlice.reducer;