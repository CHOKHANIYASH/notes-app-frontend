import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import qs from "qs"

export default function Edit() {
  const navigate = useNavigate()
  const [notes,setNotes] = useState({
    title:"",
    subtitle:"",
    description:"",
  })
  const [loading,setLoading] = useState(false)
  const {id} = useParams()
  useEffect(()=>{
    axios.get(`http://localhost:3000/notes/${id}/edit`,{ withCredentials: true })
    .then((data)=>{
      setNotes(()=>data.data.notes)
      console.log(data.data.notes.description)
    })
  },[])  
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
    axios.put(`http://localhost:3000/notes/${id}/edit`,data,{ withCredentials: true })
        .then((response)=>{
          navigate('/notes/home')
        })
        .catch((e)=>{
          console.log("error")
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
