import React from 'react'
import { Link } from 'react-router-dom'

export default function OrderPlaced() {
  return (
    <div className='flex-column align-center space-around'><div>Order Placed</div>
    <span className='cs mx-4 cartbtn align-center text-center' style={{padding:"14px",border:"1px solid",cursor:"pointer"}}><Link style={{textDecoration:"none",color:"black"}} to="/products">Continue Shopping</Link></span>
    </div>
  )
}
