import React, { useEffect } from 'react'
import Header from '../Layout/Header'
import { RootState } from '../Redux/store';
import UserModel from '../Interfaces/UserModel';

import CartItemModel from '../Interfaces/CartItemModel';
interface Props {
  cartItem: CartItemModel;
}
export default function Cart(props:Props) {
 

  return (
    <div>
        
        
        <div className="container p-4 m-2">
      
      <div
        className="d-flex flex-sm-row flex-column align-items-center custom-card-shadow rounded m-3"
        style={{ background: "ghostwhite" }}
      >
        <div className="p-3">
          <img
            src={props.cartItem.menuItem.image}
            alt=""
            width={"120px"}
            className="rounded-circl"
          />
        </div>

        <div className="p-2 mx-3" style={{ width: "100%" }}>
          <div className="d-flex justify-content-between align-items-center">
            <h4 style={{ fontWeight: 300 }}>{props.cartItem.menuItem.name}</h4>
            <h4>{props.cartItem.menuItem.price}</h4>
          </div>
          <div className="flex-fill">
            <h4 className="text-danger">{props.cartItem.menuItem.price}</h4>
          </div>
          <div className="d-flex justify-content-between">
            <div
              className="d-flex justify-content-between p-2 mt-2 rounded-pill custom-card-shadow  "
              style={{
                width: "100px",
                height: "43px",
              }}
            >
              <span style={{ color: "rgba(22,22,22,.7)" }} role="button">
                <i className="bi bi-dash-circle-fill"></i>
              </span>
              <span>
                <b>{props.cartItem.quantity}</b>
              </span>
              <span style={{ color: "rgba(22,22,22,.7)" }} role="button">
                <i className="bi bi-plus-circle-fill"></i>
              </span>
            </div>

            <button className="btn btn-danger mx-1">Remove</button>
          </div>
        </div>
      </div>
 
        </div>

    </div>
  )
}
