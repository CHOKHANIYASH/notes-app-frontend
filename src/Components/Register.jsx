import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import qs from 'qs'
import { useStateProvider } from './StateProvider'
export default function Register() {
  const {updateMessage,updateErrorMessage} = useStateProvider()
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const [formData,setFormData] = useState({
      firstName:"",
      lastName:"",
      username:"",
      email:"",
      password:"",
  })
 const handleChange =(e) =>{
     setFormData(prev =>{
         return {...prev,[e.target.name]:e.target.value}
  })
 } 
 const handleSubmit =async (e) =>{
       setLoading(true)
      e.preventDefault()
      var data = qs.stringify({
        firstName:formData.firstName,
        lastName:formData.lastName,
        username:formData.username,
        email:formData.email,
        password:formData.password,
        });
      axios.post(`${process.env.REACT_APP_SERVER_ID}/register`,data,{ withCredentials: true })
      .then((response)=>{
        updateMessage(response.data.message)
        document.cookie = `user=${response.data.user};path=/`
        navigate('/notes/home')
      })
      .catch((e)=>{
        updateErrorMessage("Not Registered")
      })
      setLoading(false)

 }
  return (
    <>
<div className="text-center mt-5 mb-5"> 
  <h1 className="">Register</h1>
</div>
    <div className="row" id="login">
      <div className="">
      <div className=" d-flex justify-content-center w-100 h-75 " id="login-div" >
          <form className="mt-5" onSubmit={handleSubmit} id="login-form">
            <div id="login-form-div">
              <div className="form-group mb-3">
                  <label htmlFor="firstName">firstName</label>
                  <input type="text" className="form-control" id="firstName" placeholder="firstName" name="firstName" onChange={handleChange}/>
                </div>
              <div className="form-group mb-3">
                  <label htmlFor="lastName">lastName</label>
                  <input type="text" className="form-control" id="lastName" placeholder="lastName" name="lastName" onChange={handleChange}/>
                </div>
              <div className="form-group mb-3">
                  <label htmlFor="username">username</label>
                  <input type="text" className="form-control" id="username" placeholder="username" name="username" onChange={handleChange}/>
                </div>
            <div className="form-group mb-3">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name="email" onChange={handleChange}/>
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name="password" onChange={handleChange}/>
            </div>
            {!loading?
            <button type="submit" className="btn btn-primary">Submit</button>
            :
            <span className="spinner-border spinner-border-sm text-primary" role="status" aria-hidden="true"></span>
            }
            </div>
          </form>
        </div>
      </div>
  
    </div>
 
    </>
  )
}
