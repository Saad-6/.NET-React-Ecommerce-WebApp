import React from 'react'
import UserModel from '../Interfaces/UserModel'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../Redux/store';
import { Link, useNavigate } from 'react-router-dom';
import { UserState, setUserState } from '../Redux/UserSlice';

export default function Profile() {
    const userData:UserModel=useSelector((state:RootState)=>state.UserStore)
    const dispatch=useDispatch()
    const navigate=useNavigate() 
    const handleLogout=()=>{
        localStorage.removeItem("token");
        dispatch(setUserState({...UserState}))
        
        navigate("/")
     }
    if(!userData.id){
    return(<div className='mt-4 flex-column align-center space-around'>
        <div>
        Login to see your profile

        </div>
        <Link to="/Login">
          <button  style={{}}id='login' className='p-2 w-100p rounded-corners border-style-none'>Log In</button>
          </Link>
    </div>)
  }
  return (
    <div>
        <div className="profile flex-column align-center space-between">
            <div className="img"><img src=""></img></div>
            <div className="name">{userData.fullName}</div>
            <div className="order"><Link to="/MyOrders">
          <button  style={{}}id='login' className='p-2 w-100p rounded-corners border-style-none'>Order Histoty and Tracking</button>
          </Link></div>
<div className="moreto">Coming soon!</div>
<span className='register'id=""><button onClick={handleLogout}  style={{}}id='login' className='p-2 w-100p rounded-corners border-style-none'>Logout</button></span>
        </div>

    </div>
  )
}
