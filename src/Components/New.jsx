import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import qs from "qs"


export default function New() {
        const navigate = useNavigate()
        const [notes,setNotes] = useState({
          title:"",
          subtitle:"",
          description:"",
        })
        const [loading,setLoading] = useState(false) 
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
          axios.post(`http://localhost:3000/notes/new`,data,{ withCredentials: true })
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
    <span className="input-group-text" id="basic-addon1">TItle</span>
    <input type="text" className="form-control" name="title" onChange={handleChange}/>
  </div>
  
  <div className="input-group mb-3">
    <span className="input-group-text" id="basic-addon2">Subtitle</span>
    <input type="text" className="form-control" name="subtitle" onChange={handleChange}/>
  </div>
  
  
  <div className="input-group">
    <span className="input-group-text">Description</span>
    <textarea className="form-control" style={{height: "100px"}} name="description" onChange={handleChange}/>
  </div>
  <button type="submit" disabled={loading} className="btn btn-primary mt-5">Submit</button>
</form>
    </>
  )
}
