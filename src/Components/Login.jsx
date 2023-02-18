import React, { useState } from 'react';
import styled from 'styled-components';
import LoginImage from "../images/LoginImage.jpg";
import axios from 'axios';
import qs from "qs";
import  {useNavigate}  from "react-router-dom";
import { useStateProvider } from './StateProvider';
export default function Login() {
  const {updateMessage} = useStateProvider()
  const navigate = useNavigate()
    const [formData,setFormData] = useState({
        username:"",
        password:"",
    })
   const handleChange =(e) =>{
       setFormData(prev =>{
           return {...prev,[e.target.name]:e.target.value}
    })
   }
   const handleSubmit =async (e) =>{
        e.preventDefault()
       
        var data = qs.stringify({
            'username':formData.username,
            'password': formData.password, 
          });
        axios.post(`${process.env.REACT_APP_SERVER_ID}/login`,data,{ withCredentials: true })
        .then((response)=>{
          updateMessage(response.data.message)
          document.cookie = `user=${response.data.user};path=/`  
          navigate('/notes/home')
        })
        .catch((e)=>{
          console.log("error")
        })
   }
  return (  
    <Container>
<div className="text-center"> 
  <h1 className="mt-5">Login</h1>
</div>

    <div className="d-sm-flex justify-content-center " id="login">
    <div className="row mt-1 mx-2 mx-sm-0 " id="login-div">
      <div className="col-6 d-none d-sm-block">
        <img src={LoginImage} id="login-photo" alt=""/>
      </div>
        
        <div className="col-sm-6 d-flex flex-column justify-content-center align-items-center">
         
        <form onSubmit={handleSubmit} id="login-form">
          <div id="login-form-div">
          <div className="form-group mb-3">
            <label htmlFor="username">Username</label>
            <input type="text" className="form-control" id="username" aria-describedby="username"
             placeholder="Enter username" name="username" value={formData.username} onChange={handleChange}/>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1"
             placeholder="Password" name="password" value={formData.password} onChange={handleChange}/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
      
  
    </div>
 
    </Container>
  )
}

const Container = styled.div` 
    #login{
    height: 100vh;
}
#login-div{
    
    background-color:white;
    box-shadow: rgba(255, 255, 255, 0.1);
    border-radius: 50px;
    height:30rem;
}
#login-photo{
    width:100%;
    height:100%;
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
}

#login-form{
    width:50%;
    margin-top: 5px;
    
}
`
