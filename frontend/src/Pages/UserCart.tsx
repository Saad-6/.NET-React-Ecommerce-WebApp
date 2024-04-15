
import CartApiResponse from '../Interfaces/cartApiResponse';
import React, { useCallback, useEffect, useState } from 'react'
import { RootState } from '../Redux/store';
import UserModel from '../Interfaces/UserModel';
import { useSelector } from 'react-redux';
import { useGetCartQuery } from '../apis/CartAPI';
import CartModel from '../Interfaces/CartModel';
import CartItemModel from '../Interfaces/CartItemModel';
import Cart from '../Components/Cart';
import TestCartItem from '../Components/TestCartItem';
import { Link } from 'react-router-dom';
export default function UserCart() {
  const userData: UserModel = useSelector((state: RootState) => state.UserStore);
  const { data: cartData,isLoading,isError, refetch: refetchCart } = useGetCartQuery(userData.id);
  
  const userCart: CartModel | undefined = cartData?.result;
  const [userCartTotal,setCartTotal]=useState()

  useEffect(() => {
    refetchCart();
  }, [userData, refetchCart]);

  // Handler function to refetch cart data after an item is removed
  const handleCartChange = useCallback(() => {
    refetchCart();
  }, [refetchCart]);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>You need to login to Add items to your cart
      <Link to="/Login">Login?</Link>
    </div>;
  }
  return (
    <div>
    <div  className=' py-3 flex space-evenly align-center'>
<h3 style={{fontWeight:"bolder"}}>Cart</h3>
<span className='cs mx-4 cartbtn align-center text-center' style={{padding:"14px",border:"1px solid",cursor:"pointer"}}><Link style={{textDecoration:"none",color:"black"}} to="/products">Continue Shopping</Link></span>
<span className=' mx-4 flex space-between p-4' style={{padding:"14px",cursor:"pointer"}}>Total:<h4 className='' style={{fontWeight:"bolder"}}>{userCart?.cartTotal} </h4>  Rs</span>

<span className='mx-4 cartbtn' style={{backgroundColor:"black",letterSpacing:"2px",color:"white",padding:"14px 30px",border:"1px solid",cursor:"pointer"}}> <Link style={{textDecoration:"none",color:"white"}} to="/Checkout">Checkout</Link></span>

    
    </div>
    {userCart?.cartItems?.map((cartItem:CartItemModel, index:number) => (
            <div>
   <TestCartItem  cartItem={cartItem} key={index} onItemRemoved={handleCartChange} ></TestCartItem>
            <div style={{padding:"10px 0px"}}></div>
         

            </div>

          ))}
  </div>
  )
}
