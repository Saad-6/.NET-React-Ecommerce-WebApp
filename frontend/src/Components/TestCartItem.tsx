import React from 'react'
import CartItemModel from '../Interfaces/CartItemModel';
import { useUpdateCartMutation } from '../apis/CartAPI';
import UserModel from '../Interfaces/UserModel';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
interface Props {
  cartItem: CartItemModel;
  onItemRemoved: () => void;
}
export default function TestCartItem(props:Props) {
  const [updateCart] = useUpdateCartMutation();
  const userData: UserModel = useSelector((state: RootState) => state.UserStore);

  const handleRemove = async (menuItemId: number) => {
    try {
      await updateCart({
        userId: userData.id,
        menuItemId: menuItemId,
        updateQuantityBy: -props.cartItem.quantity
      });
      // Call the parent's function to refetch cart data after item removal
      props.onItemRemoved();
    } catch (error) {
      console.error('Error removing item:', error);
    }
 
    }
    const increment=async()=>{
      try{
        await updateCart({
          userId: userData.id,
          menuItemId: props.cartItem.menuItemId,
          updateQuantityBy: 1
        });
        // Call the parent's function to refetch cart data after item removal
        props.onItemRemoved();

      }catch(error){
      
      }
            
          }
          const decrement=async()=>{
      
      try{
        await updateCart({
          userId: userData.id,
          menuItemId: props.cartItem.menuItemId,
          updateQuantityBy: -1
        });
        // Call the parent's function to refetch cart data after item removal
        props.onItemRemoved();


      }catch(error){
        
      }
  };
  return (
    <div>
      
      <div style={{background:"ghostwhite"}} className="item flex space-around align-center">
        <div className="image">
        <img
            src={props.cartItem.menuItem.image}
            width="120px"
            style={{ }}
            alt="No content"
          ></img>
        </div>
      <div className="name">
<h3 className='carti'>{props.cartItem.menuItem.name}</h3>
      </div>
<div className="quantity" >
  <i onClick={()=>increment()} style={{padding:"10px",border:"1px",cursor:"pointer"}} className='bi bi-plus'></i>
{props.cartItem.quantity}
<i onClick={()=>decrement()} style={{padding:"10px",border:"1px",cursor:"pointer"}} className='bi bi-dash'></i>
</div>
<div className="subtotal">
  <h6>Subtotal:</h6>
  <h4>{props.cartItem.menuItem.price*props.cartItem.quantity}</h4>
</div>
  
  <div className="PriceandRemove flex space-between">
  
<div className="price flex-column"><h6>Price:</h6><h4>{props.cartItem.menuItem.price}</h4></div>
<div className="x"><span style={{cursor:"pointer"}} onClick={() => handleRemove(props.cartItem.menuItemId)} className='px-3 text-danger'>Remove</span></div>
  </div>
      </div>

    </div>
  )
}
