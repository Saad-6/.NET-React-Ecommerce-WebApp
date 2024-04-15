import React, { useEffect } from 'react'
import UserModel from '../Interfaces/UserModel';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import { useGetUserOrdersQuery } from '../apis/OrderAPI';
import { useNavigate } from 'react-router-dom';
import OrderModel from '../Interfaces/OrderModel';
import Order from '../Components/Order';
export default function MyOrders() {
    const userData: UserModel = useSelector((state: RootState) => state.UserStore);
    const getUserOrders=useGetUserOrdersQuery(userData.id);
    const orders:OrderModel[]=getUserOrders.data;
    console.log(orders)
    const navigate=useNavigate()
    useEffect(()=>{

 
    },[userData,getUserOrders])
    if(userData.id==null){
        return(<div>Access Denied</div>)
    }
  return (
    <div>
         {orders?.map((order: OrderModel, index: number) => (
                <Order order={order}></Order>
              ))}
    </div>
  )
}
