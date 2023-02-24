import React from 'react'
import { useState } from 'react';
import { useContext } from 'react'

const StateContext = React.createContext()
export function StateProvider({children}){
    
    const [message,setMessage] = useState("");
    const [errorMessage,setErrorMessage] = useState("");
     function updateMessage(message){
        setMessage(message)
     }
     function updateErrorMessage(message){
        setErrorMessage(message)
     }
  return (
    <StateContext.Provider value={{message,updateMessage,errorMessage,updateErrorMessage}}>
        {children}
    </StateContext.Provider>
  )
}

export const useStateProvider = () => useContext(StateContext)

