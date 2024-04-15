import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const AuthAPI=createApi({

    reducerPath:"AuthAPI",
    baseQuery:fetchBaseQuery({
        baseUrl:"https://localhost:44360/api/",

    }),
    
    endpoints:(builder)=>({
 
       
        registerUser: builder.mutation({
          query: ( UserCred ) => ({
            url: "auth/register",
            method: "POST",
            headers:{
              "Content-type":"application/json",
            },
            body: UserCred,
          }),
          }),

        loginUser: builder.mutation({
            query: ( UserCred ) => ({
              url: "auth/login",
              method: "POST",
              headers:{
                "Content-type":"application/json",
              },
              body: UserCred,
            }),
          }),
          
        

    }),

})

export const { useRegisterUserMutation,useLoginUserMutation } = AuthAPI;
export default AuthAPI;
