import React from 'react'

export default function Register() {
  return (
    <>
<div class="text-center mt-5 mb-5"> 
  <h1 class="">Register</h1>
</div>
    <div class="row"  id="login">
      <div class="">
      <div class=" d-flex justify-content-center w-100 h-75 " id="login-div" >
          <form class="mt-5" action="/register" method="POST" id="login-form">
            <div id="login-form-div">
              <div class="form-group mb-3">
                  <label for="firstName">firstName</label>
                  <input type="text" class="form-control" id="firstName" placeholder="firstName" name="firstName"/>
                </div>
              <div class="form-group mb-3">
                  <label for="lastName">lastName</label>
                  <input type="text" class="form-control" id="lastName" placeholder="lastName" name="lastName"/>
                </div>
              <div class="form-group mb-3">
                  <label for="username">username</label>
                  <input type="text" class="form-control" id="username" placeholder="username" name="username"/>
                </div>
            <div class="form-group mb-3">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name="email"/>
              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group mb-3">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" name="password"/>
            </div>
          
          
            <button type="submit" class="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
  
    </div>
 
    </>
  )
}
