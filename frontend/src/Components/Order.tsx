import React, { useEffect, useState } from 'react'
import OrderModel from '../Interfaces/OrderModel';
import CartItemModel from '../Interfaces/CartItemModel';
import AddressModel from '../Interfaces/AddressModel';
interface Props{
    order:OrderModel;
}
export default function Order(props:Props) {
    const[address,setAddress]=useState<AddressModel>();
    useEffect(()=>{

    },[])
    const getStatusColor = () => {
        switch (props.order.status) {
          case 'pending':
            return 'text-secondary';
          case 'confirmed':
            return 'text-primary';
          case 'delievered':
            return 'text-success';
          case 'cancelled':
            return 'text-danger';
          default:
            return '';
        }
      };
  return (
    <div className="order-container">
    <h2>Order Details</h2>
    <div className={`order-details ${getStatusColor()}`}>
      <p><strong>Order ID:</strong> {props.order.id}</p>
      <p><strong>User Address:</strong> {props.order.userAddress}</p>
      <p className=''><strong>Status:</strong> {props.order.status}</p>
      <p><strong>Total:</strong> {props.order.total}</p>
      <p><strong>Date & Time:</strong> {props.order.dateTime}</p>
    </div>
    <h3>Products</h3>
    <div className="cart-items">
      {props.order.cartItems.map((item: CartItemModel) => (
        <div key={item.id} className="cart-item">
          <p><strong>Item:</strong> {item.menuItem.name}</p>
          <p><strong>Description:</strong> {item.menuItem.description}</p>
          <p><strong>Price:</strong> {item.menuItem.price}</p>
        </div>
      ))}
    </div>
  </div>
  )
}
