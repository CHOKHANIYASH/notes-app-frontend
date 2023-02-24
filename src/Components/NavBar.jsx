import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useStateProvider } from './StateProvider'
export default function NavBar() {
  const {updateMessage,updateErrorMessage} = useStateProvider()
  const navigate = useNavigate()
  const navbar_nav = {
    marginLeft:"auto",
    marginRight:"0 px",
  }
  const cookie = document.cookie
  let userArr = cookie.split(";")
  let arr = userArr.map((arr)=>{
      const a = arr.split("=")
      return a
  })
  function logout(){
    axios.get(`${process.env.REACT_APP_SERVER_ID}/logout`,{ withCredentials: true })
    .then((response)=>    updateMessage(response.data.message)    )
    .catch((e)=>{
      updateErrorMessage("Something went wrong")
    })
    document.cookie = "user=;path=/"
    navigate('/login')
  }

  return (
    <>
    <Container>
      
          <nav className="navbar navbar-expand-lg navbar-light bg-light" >
            <div className="container-fluid">
              <div className="navbar-brand">Notes </div>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                  <a className="nav-link active" aria-current="page" href="/notes/home">Home</a>
                  <a className="nav-link active" href="/notes/starred">Starred</a>
                </div>
                <div className="navbar-nav" style={navbar_nav}>
                      { arr[0][1]==='' || arr[0][0]===''?
                      <>
                      <a className="nav-link active" href="/login">Login</a>
                      <a className="nav-link active" href="/register">Register</a>
                      </>
                      :
                      <a className="nav-link active"  href="true" onClick={logout} >Logout</a>
                      }
              </div>
              </div>
            </div>
          </nav>
    </Container>
    </>
  )
}

const Container = styled.div`
        
`