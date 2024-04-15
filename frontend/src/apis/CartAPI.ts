import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const CartAPI=createApi({

    reducerPath:"CartApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"https://localhost:44360/api/",

    }),
    tagTypes:["Cart"],
    endpoints:(builder)=>({
 
        
        getCart:builder.query({
            query:(id)=>({
                url:`cart`,
                params:{
                    userId:id
                }
            }),
            
        }),
        updateCart: builder.mutation({
            query: ({ userId,menuItemId,updateQuantityBy }) => ({
              url: `cart`,
              method: "POST",
              params:{
                userId:userId,
                menuItemId:menuItemId,
                updateQuantityBy:updateQuantityBy
              }
            }),
          }),
    

    }),

})

export const { useGetCartQuery, useUpdateCartMutation } = CartAPI;
export default CartAPI;
