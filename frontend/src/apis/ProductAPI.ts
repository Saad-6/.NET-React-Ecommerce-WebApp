import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const ProductApi=createApi({

    reducerPath:"ProductApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"https://localhost:44360/api/",

    }),
    tagTypes:["MenuItem"],
    endpoints:(builder)=>({
 
        getAllProducts:builder.query({
            query:()=>({
                url:"menuitem",
            }),
            providesTags:["MenuItem"]
        }),
        getProductById:builder.query({
            query:(id)=>({
                url:`menuitem/${id}`,
            }),
            providesTags:["MenuItem"]
        }),
        updateProductById: builder.mutation({
            query: ({ id, data }) => ({
              url: `MenuItem?id=${id}`,
              method: "PUT",
              body: data,
            }),
          }),
          deleteProductById: builder.mutation<void, number>({
            query: (id) => ({
              url: `MenuItem?id=${id}`,
              method: 'DELETE',
            }),
          }),
        

    }),

})

export const { useGetAllProductsQuery, useGetProductByIdQuery, useUpdateProductByIdMutation,useDeleteProductByIdMutation } = ProductApi;
export default ProductApi;
