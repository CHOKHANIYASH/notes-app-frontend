import React from 'react'
import { useState } from 'react';
import { useContext } from 'react'

const StateContext = React.createContext()
export function StateProvider({children}){
    
    const [message,setMessage] = useState("");
     function updateMessage(message){
        console.log(message)
        setMessage(message)
     }
  return (
    <StateContext.Provider value={{message,updateMessage}}>
        {children}
    </StateContext.Provider>
  )
}

export const useStateProvider = () => useContext(StateContext)

