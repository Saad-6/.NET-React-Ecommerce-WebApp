import React, { useState } from 'react'
import Header from '../Layout/Header'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginUserMutation } from '../apis/AuthAPI';
import apiResponse from '../Interfaces/ApiResponse';
import { jwtDecode } from 'jwt-decode';
import UserModel from '../Interfaces/UserModel';
import { useDispatch } from 'react-redux';
import { setUserState } from '../Redux/UserSlice';

export default function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        
      });
    const [errors,setErrors]=useState("");
    const [loginUser]=useLoginUserMutation();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };

      const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
       const respone:apiResponse=await loginUser({
        Email:formData.email,
        Password:formData.password
       })
       if(respone.data){
           console.log(respone.data.result)
           const token=respone.data.result.jwt;
           console.log("BEfore")
           localStorage.setItem("token",token)
           
           const {fullName,id,userName,email,role}:UserModel=jwtDecode(token);
           console.log(" "+ fullName+"---- "+"----- "+id+"---- "+userName+"---- "+email+"--- "+role);
            dispatch(setUserState({fullName,id,userName,email,role }))
           navigate("/")
       }else if(respone.error){
        setErrors("Invalid Login Attempt")
       }
           
      };
    
  return (
    <div>
       
        <div className=''>
            <form onSubmit={handleSubmit} style={{backgroundColor:"white",minHeight:"400px",maxWidth:"700px",marginTop:"50px"}}id="authForm" className='flex-column space-evenly align-center' action="POST">
                <h3>Login to your account</h3>
                <span className='text-danger'>{errors}</span>

                <div className="email flex-column" >
                    <label htmlFor="email">Email</label>
                    <input  onChange={handleInputChange}  className='p-3' type="email"style={{width:"500px",backgroundColor:"#F0F0F0"}} placeholder='Enter your email' name="email" />
                </div>

                <div className="pass flex-column">
                    <label htmlFor="pass">Password</label>
                    <input   onChange={handleInputChange} className='p-3' type="password"style={{width:"500px",backgroundColor:"#F0F0F0"}} placeholder='Enter your password' name="password" />
                </div>
                <Link to="/Register">New user? Sigunp here</Link>
                <button className='submit' type="submit" style={{width:"500px",textDecoration:"none",backgroundColor:"black",color:"white",padding:"10px"}}>Login</button>
                
            </form>
        </div>
    </div>
  )
}
