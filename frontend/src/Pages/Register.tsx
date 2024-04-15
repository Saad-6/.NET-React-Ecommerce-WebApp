
import Header from '../Layout/Header'
import { Link,  useNavigate } from 'react-router-dom'
import React, { useState } from 'react';
import { useLoginUserMutation, useRegisterUserMutation } from '../apis/AuthAPI';
import ApiResponse from '../Interfaces/ApiResponse';
import { error } from 'console';
export default function Register() {

    const [formData, setFormData] = useState({
        fullName: '',
        userName: '',
        email: '',
        password: '',
        
      });
      const [errors, setErrors] = useState<string[]>([]);
      const [registerUser] = useRegisterUserMutation();
     
      const navigate=useNavigate();
      const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
       
            console.log('Submitting form with data:', formData);
            const response :ApiResponse = await registerUser({
                Name: formData.fullName,
                UserName: formData.userName,
                Email: formData.email,
                Password: formData.password,
               
            });
            if(response.data){
             
        console.log("data: "+response.data)      
        navigate("/Login")    
        
    }
    else if(response.error){
        setErrors(Array.isArray(response.error.data) ? response.error.data : [response.error.data]);
                console.log(response.error)
                
            }
           
   
      };
    
      const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };
    
  return (
    <div>
       
        <div className=''>
            <form onSubmit={handleSubmit} id="authForm" style={{backgroundColor:"white",minHeight:"400px",maxWidth:"700px",marginTop:"50px"}} className='flex-column space-evenly align-center' action="POST">
                <h3>Create a new account</h3>
                {errors.length > 0 && (
            <div className="alert alert-danger" role="alert">
              {errors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
                <div className="name flex space-around">
                    <div className="fullname flex-column">

                    <label htmlFor="fn">Full Name</label>
                    <input 
                    style={{backgroundColor:"#F0F0F0"}} 
                    className='p-3'
                    id='fn'
                    type="text"
                    placeholder='Full Name'
                    value={formData.fullName}
                    onChange={handleInputChange}
                    name="fullName"
                    />
                    </div>
                    <div style={{width:"30px"}}></div>
                    <div className="username flex-column">

                    <label  htmlFor="un">UserName</label>
                    <input
                    style={{backgroundColor:"#F0F0F0"}}
                    className='p-3'
                    type="text"
                    placeholder='User Name'
                    value={formData.userName}
                    onChange={handleInputChange}
                    name="userName"
                    />
                </div>
                    </div>

                <div className="email flex-column" >
                    <label htmlFor="email">Email</label>
                    <input
                    className='p-3'
                    type="email"
                    style={{width:"500px",backgroundColor:"#F0F0F0"}}
                    placeholder='Enter your email'
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    
                    />
                </div>
                <div className="flex">
                    <small className='text-secondary'>*Password must contain atleast one number,capital letter <br></br> and a special character</small>
                </div>

                <div className="pass flex-column">
                    <label htmlFor="pass">Password</label>
                    <input
                    className='p-3'
                    type="password"
                    style={{width:"500px",backgroundColor:"#F0F0F0"}}
                    placeholder='Enter your password'
                    name="password"
                    value={formData.password}
                    
                    onChange={handleInputChange}

                    />
                </div>
                <Link to="/Login">Already a user? Login here</Link>
                <button className='submit' type='submit' style={{width:"500px",textDecoration:"none",backgroundColor:"black",color:"white",padding:"10px"}}>Register</button>
                <div className="submit"> </div>

            </form>
        </div>
    </div>
  )
}
