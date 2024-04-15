import React from 'react'
import { RootState } from '../Redux/store';
import UserModel from '../Interfaces/UserModel'
import { useDispatch, useSelector } from 'react-redux'
import { useGetAllOrdersQuery } from '../apis/OrderAPI';
import Orders from '../Components/Orders';

export default function ManangeOrders() {
    const userData:UserModel=useSelector((state:RootState)=>state.UserStore)
    const getOrders=useGetAllOrdersQuery(null);
    
    console.log(getOrders)
    const dispatch=useDispatch()
    if(userData.role!="Admin"){
        return(<div>Access Denied</div>)
    }
   
  return (
    <Orders></Orders>
  )
}
