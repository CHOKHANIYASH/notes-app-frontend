import React from 'react'
import { Route,Navigate,Outlet } from 'react-router-dom'
export default function PrivateRoute({component:Component,...rest}) {
    const cookie = document.cookie
    let userArr = cookie.split(";")
    let arr = userArr.map((arr)=>{
     
        const a = arr.split("=")
        return a
    })

return arr[0][0]==='user' && arr[0][1] !==''? <Outlet/>:<Navigate to='/login'/>

}
