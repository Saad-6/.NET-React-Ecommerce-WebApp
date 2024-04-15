import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const OrderAPI=createApi({

    reducerPath:"OrderApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"https://localhost:44360/api/",

    }),
    tagTypes:["Cart"],
    endpoints:(builder)=>({
 
        
        getAllOrders:builder.query({
            query:()=>({
                url:`Order/Orders`,
                
            }),
            
        }),
        getAnalytics:builder.query({
            query:()=>({
                url:`Order/Analytics`,
                
            }),
            
        }),
        getPendingOrders:builder.query({
            query:()=>({
                url:`Order/PendingOrders`,
                
            }),
            
        }),
        getConfirmedOrders:builder.query({
            query:()=>({
                url:`Order/ConfirmedOrders`,
                
            }),
            
        }),
        getDelieveredOrders:builder.query({
            query:()=>({
                url:`Order/DelieveredOrders`,
                
            }),
            
        }),
        getUserOrders:builder.query({
            query:(id)=>({
                url:`Order/GetUserOrders`,
                params:{
                    userId:id
                }
            }),
            
        }),
      
        placeOrder: builder.mutation({
            query: ({ cartId,Address }) => ({
              url: `Order/PlaceOrder`,
              method: "POST",
              params:{
                CartId:cartId,
                Address:Address
              }
            }),
          }),
        confirmOrder: builder.mutation({
            query: ({ orderId }) => ({
              url: `Order/ConfirmOrder`,
              method: "POST",
              params:{
                orderId:orderId
              }
            }),
          }),
        cancelOrder: builder.mutation({
            query: ({ orderId }) => ({
              url: `Order/CancelOrder`,
              method: "POST",
              params:{
                orderId:orderId
              }
            }),
          }),
          delieverOrder: builder.mutation({
            query: ({ orderId }) => ({
              url: `Order/DeliverOrder`,
              method: "POST",
              params:{
                orderId:orderId
              }
            }),
          }),

    }),
})

export const {  usePlaceOrderMutation,useCancelOrderMutation,useConfirmOrderMutation,useDelieverOrderMutation,useGetAllOrdersQuery,useGetAnalyticsQuery,useGetConfirmedOrdersQuery,useGetDelieveredOrdersQuery,useGetPendingOrdersQuery,useGetUserOrdersQuery } = OrderAPI;
export default OrderAPI;
