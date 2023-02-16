import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import qs from "qs"
import { useStateProvider } from './StateProvider'
export default function Edit() {
  const {updateMessage} = useStateProvider()
  const navigate = useNavigate()
  const [notes,setNotes] = useState({
    title:"",
    subtitle:"",
    description:"",
  })
  const [loading,setLoading] = useState(false)
  const {id} = useParams()
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_SERVER_ID}/notes/${id}/edit`,{ withCredentials: true })
    .then((data)=>{
      setNotes(()=>data.data.notes)
    })
  },[id])  
  function handleChange(e){
    setNotes((notes)=>{
      return {...notes,[e.target.name]:e.target.value}
    })
  }
  function handleSubmit(e){
    setLoading(true)
    e.preventDefault()
    const data = qs.stringify({notes:{
      'title':notes.title,
      'subtitle':notes.subtitle,
      'description':notes.description
    }})
    axios.put(`${process.env.REACT_APP_SERVER_ID}/notes/${id}/edit`,data,{ withCredentials: true })
        .then((response)=>{
          updateMessage(response.data.message)
          navigate('/notes/home')
        })
        .catch((e)=>{
          updateMessage(e)
        })
    setLoading(false)
  }

  return (
    <>
<form onSubmit={handleSubmit}>
  <div className="input-group mt-3 mb-3">
    <span className="input-group-text" id="basic-addon1">Title</span>
    <input type="text" className="form-control" id="title" onChange={handleChange} name="title" value={notes.title}/>
  </div>
  
  <div className="input-group mb-3">
    <span className="input-group-text" id="basic-addon2">Subtitle</span>
    <input type="text" className="form-control" id="subtitle" onChange={handleChange} name="subtitle" value={notes.subtitle}/>
  </div>
  
  <div className="input-group">
    <span className="input-group-text">Description</span>
    <textarea type="text" className="form-control" id="description" style={{height: "100px"}} onChange={handleChange} name="description" value={notes.description}/>
  </div>
  <button type="submit" disabled={loading} className="btn btn-primary mt-5">Submit</button>
</form>
</>
  )
}
