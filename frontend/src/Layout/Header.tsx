import { RootState } from '../Redux/store';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import UserModel from '../Interfaces/UserModel';
import { UserState, setUserState } from '../Redux/UserSlice';

import Hamburger from './Hamburger';
let logo=require("../../src/Images/P.png")
export default function Header() {
  const userData:UserModel=useSelector((state:RootState)=>state.UserStore)
  const ff=logo;
  const [hamburgerActive, setHamburgerActive] = useState(false);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const toggleHamburger = () => {
    setHamburgerActive(!hamburgerActive);
  };
  const handleLogout=()=>{
localStorage.removeItem("token");
dispatch(setUserState({...UserState}))

navigate("/")
  }
  return (
    <div className=''>
      
     
      <div className="UpperHeader">
          <div className="logo ">
          <img src={ff}style={{width:"120px",height:"75px"}}></img>
          </div>
          <div  className={`searchbox navitem ${hamburgerActive ? 'active' : ''}`}>
          <input className='form-control w-150p rounded-corners' type="text"placeholder='search' />
           </div>
    
           <div className={`authButtons navitem ${hamburgerActive ? 'active' : ''}`}>
          {userData.id &&(         
          <>
          <span className='mx-2'>Hello {userData.fullName} !</span>
          <button onClick={handleLogout}  style={{}}id='login' className='p-2 w-100p rounded-corners border-style-none'>Logout</button>
          </>
          )}
          {!userData.id &&(
            <>
          <Link to="/Login">
          <button  style={{}}id='login' className='p-2 w-100p rounded-corners border-style-none'>Log In</button>
          </Link>
          <Link to="/Register">
          <button id="register" className='mx-1 p-2 w-100p rounded-corners border-style-none'style={{}}>Register</button>
          </Link>  
            </>
          )}
        </div>
        
        <div onClick={toggleHamburger} className="hamburger">
          <h4>

          <i className='bi bi-list'></i>
          </h4>
        </div>
        </div>
        <div className="DownHeader py-3 px-4"style={{backgroundColor:"white"}}>
          
          <ul style={{listStyle:"none"}} className='flex space-between'>
            <li className='navlink'><Link style={{textDecoration:"none",color:"#474d4b"}} to="/"><b>Home</b></Link></li>
            <li className='navlink'><Link style={{textDecoration:"none",color:"#474d4b"}} to="/AllProducts" ><b>Best Sellers</b> </Link></li>
            <li className='navlink'><Link style={{textDecoration:"none",color:"#474d4b"}} to="/Cart"><b><i className='bi bi-cart'></i> </b> </Link></li>
            <li className='navlink' ><Link to="/Profile"style={{textDecoration:"none",color:"#474d4b"}}><b>Profile<i className='bi bi-person'></i></b> </Link></li>
            {userData.role=="Admin" &&(
                <li style={{marginRight:"20px",paddingRight:"10px"}} className="navlink dropdown" >
                <span style={{textDecoration:"none",color:"#474d4b"}}>
               <b>Admin Panel <i className='bi bi-gear'></i></b>
              </span>
              <div className="dropdown-content">
                <Link to="/Products/List">Manage Products <i className='bi bi-calendar-event-fill'></i></Link>
                <Link to="/ManageOrders">Manage  Orders<i className='mx-1 bi bi-journal-text'></i> </Link>
                <Link to="/Analytics">Analytics <i className='bi bi-graph-up'></i></Link> 
              </div>
               </li>
            )}
            {userData.role!="Admin"&&(
              <li id="explore" className='navlink mx-2'>
                  <Link style={{textDecoration:"none",color:"#474d4b"}} to="">Explore</Link>
              </li>
            )}
           
           
          </ul>
         
          </div>        
    </div>
  )
}
