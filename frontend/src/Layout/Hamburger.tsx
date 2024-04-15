import React, { useState } from 'react'

export default function Hamburger() {
    const[Navigation,setNaigation]=useState(false)
const showNavigation=()=>{
setNaigation(!Navigation)
}

  return (
    <div className='hamburger'>
        <h3 onClick={showNavigation}>
       <i className='bi bi-list'></i>
        </h3>
        {Navigation && (<div>
           <div style={{}} className="responsive-links">
               <li>Home</li>
               <li>All Products</li>
               <li>Best Sellers</li>
               <li>Log In</li>
               <li>Register</li>
               <li>Profile</li>
           </div>
        </div>)}

    </div>
  )
}
