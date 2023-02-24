import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useStateProvider } from './StateProvider';
export default function Note() {
  const {updateMessage,updateErrorMessage} = useStateProvider()
  const [notes,setNotes] = useState([])
  const [starred,setStarred] = useState([])
  const {id} = useParams()
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_SERVER_ID}/notes/${id}/home`,{ withCredentials: true })
    .then((data)=>{
      setNotes(()=>data.data.notes)
      setStarred(()=>data.data.starred)
    })
    .catch((e)=>{
      updateErrorMessage('Something went wrong')
    })
  },[id,updateErrorMessage])   
  
  return (
    <>
     <div className="card text-center mt-5" style={{ overflow:"auto"}}>
     <div className="card-header">
       { notes.title }
     </div>
     <div className="card-body text-wrap">
       <h5 className="card-title">{notes.subtitle } </h5>
       <div className="text-wrap">
       <p className="card-text">{ notes.description }</p>
     </div>
     </div>
     </div>
</>
  )
}