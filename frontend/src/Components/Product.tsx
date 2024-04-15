import React, { useEffect } from 'react';
import ProductModel from '../Interfaces/ProductModel';
import { Link } from 'react-router-dom';
import UserModel from '../Interfaces/UserModel';
import { RootState } from '../Redux/store';
import { useSelector } from 'react-redux';
interface Props {
  product: ProductModel;
  onChangeProduct():void
}

export default function Product(props: Props) {
  const userData:UserModel=useSelector((state:RootState)=>state.UserStore)
  useEffect(()=>{
    try{

      props.onChangeProduct()
    }
    catch(e){}
  },[userData])
  return (
    <div style={{ height: "300px", border: "1px", maxWidth: "380px", backgroundColor: "white" }} className='Product flex-column space-around align-center '>
      <div className="image">
        <img style={{aspectRatio:"3/2",objectFit:"contain", maxHeight: "180px", maxWidth: "150px",minHeight:"180px",minWidth:"100%" }} src={props.product.image} alt={props.product.name} />
      </div>
      <div className="title">
        <h6><b>{props.product.name}</b></h6>
      </div>
      <div className="price">
        <h6><sub>Rs</sub><b>{props.product.price}</b></h6>
        {props.product.gimmickPrice && (

        <h6 style={{ textDecoration: "line-through", color: "red" }}><sub>Rs</sub><b>{props.product.gimmickPrice}</b></h6>
        )}
      </div>
      {userData.role=="Admin" && (


      <div className="crud flex space-between ">
        <Link to={`/ProductEdit/${props.product.id}`} ><i className='mx-4 bi bi-pencil'></i></Link>
      <Link to=""><i className='mx-4 bi bi-trash text-danger'></i></Link>
      </div>
      )}
    </div>
  );
}
