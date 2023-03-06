import React,{useEffect,useState} from 'react'
import axios from 'axios';
import styled from "styled-components"
import starFill from "../images/star-fill.svg"
import Star from "../images/star.svg"
import searchIcon from "../images/search_FILL0_wght500_GRAD0_opsz48.svg"
import addNew from "../images/add_box_FILL0_wght400_GRAD0_opsz48.svg"
import { useNavigate } from 'react-router-dom';
import { useStateProvider } from './StateProvider';
export default function Home() {
  const {updateMessage,updateErrorMessage} = useStateProvider()
  const navigate = useNavigate()
  const [notes,setNotes] = useState([])
  const [starred,setStarred] = useState([])
  const [loading,setLoading] = useState(false)
  const [loading1,setLoading1] = useState(false)
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_SERVER_ID}/notes/home`,{ withCredentials: true })
    .then((data)=>{
      setNotes(()=>data.data.notes)
      setStarred(()=>data.data.starred)
    })
    .catch((e)=>{
      updateErrorMessage('Something went wrong')
    })
  },[updateErrorMessage])
  function star(e){
    setLoading(true)
    axios.post(`${process.env.REACT_APP_SERVER_ID}/notes/${e.currentTarget.name}/starred`,{},{ withCredentials: true })
    .then((data)=>{
      axios.get(`${process.env.REACT_APP_SERVER_ID}/notes/home`,{ withCredentials: true })
    .then((data)=>{
     setStarred(()=>data.data.starred)
    setLoading(false)
    })
    .catch((e)=>{
      updateErrorMessage("Something went wrong")
    })
  })
  .catch((e)=>{
    updateErrorMessage("Error in Marking star")
  })
  }
 async function handleDelete(e){
    setLoading1(true)
    e.preventDefault()
    const id = e.target.name
    await axios.delete(`${process.env.REACT_APP_SERVER_ID}/notes/${id}/delete`,{ withCredentials: true })
    .then((response)=>{
      updateMessage(response.data.message)
      axios.get(`${process.env.REACT_APP_SERVER_ID}/notes/home`,{ withCredentials: true })
    .then((data)=>{
      setNotes(()=>data.data.notes)
    })
    .catch((e)=>{
      updateErrorMessage("something went wrong")
    })
    })
    .catch((e)=>{
      updateErrorMessage("Not Deleted")
    })
    setLoading1(false)
  }
  function search(e){
    let inputVal = e.target.value.toLowerCase();
    let noteCards = document.getElementsByClassName('card');
    Array.from(noteCards).forEach(function(element){
        let cardTitle = element.getElementsByTagName("h5")[0].innerText.toLowerCase();
        let cardSubtitle = element.getElementsByTagName("h6")[0].innerText.toLowerCase();
        let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();

        if(cardTxt.includes(inputVal) || cardSubtitle.includes(inputVal) || cardTitle.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })
  }
  function noteDisplay(e){
    const id = e.currentTarget.getAttribute('name')
    navigate(`/notes/${id}/home`)

  }
  return (
    <>
        <Container>
         <div className="d-flex justify-content-between">
          <div className="list-no">
             <h2> {notes.length } </h2>
          </div>
          <div className="add-new">
           <a href="/notes/new"><img src={addNew} alt=""/></a>  
          </div>
        </div>
        <div className="container-fluid col-sm-6 d-flex justify-content-center " >
          <div className="input-group mb-3 " >
            <input type="text" className="form-control" id="searchTxt" placeholder="Search your list" aria-label="search-list" aria-describedby="basic-addon2" 
             onChange={search} />
            <span className="input-group-text" id="basic-addon2"><img src={searchIcon} alt="" style={{width:"  2vw"}}/>
            </span>
          </div>
        </div>
        <div className=" row row-cols-auto ">
      {    notes.map((notes) => 
          (<div className="col" key={notes._id}  >
          <div className="card " style={{width: "18rem"}} name={notes._id}  onDoubleClick={noteDisplay}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
              <h5 className="card-title inline">{notes.title}  </h5>
          
               {
              starred.includes(notes._id)?
              <button style={{background:'none',border:'none',}}  disabled={loading} onClick={star} name={notes._id}><img  src={starFill} alt="star-filled" className="star"/></button>
              :
              <button style={{background:'none',border:'none',}}  disabled={loading} onClick={star} name={notes._id}><img  src={Star} alt="star-not-fill" className="star"/></button>
               }
              
            </div>
              <h6 className="card-subtitle mb-2 text-muted">{ notes.subtitle } </h6>
              <p className="card-text overflow-auto">{notes.description } </p>
              <a className="btn btn-primary m-1" href={`/notes/${notes._id}/edit`} role="button">Edit</a>          
              {!loading1?
              <form className="d-inline" onSubmit={handleDelete} name={notes._id}>
                <button type="submit" className="btn btn-danger" >Delete</button>
              </form>   
              :
              <span className="spinner-border spinner-border-sm text-primary" role="status" aria-hidden="true"></span>
              }           
            
            </div>
          </div>
          </div>)
        )}
        </div>
        </Container>
    </>
  )
}

const Container = styled.div`
  .search{
    display: flex;
    justify-content: center;
    align-items: center;
}

.search input[type=text]{
    width:300px;
    height:25px;
    border-radius:25px;
    border: none;
}
     

.search button{
    background: none;
    float: right;
    margin-right: 16px;
    font-size: 12px;
    border: none;
    cursor: pointer;
}

.search button img {

    height:25px;
}
.col{
    margin-bottom:10px;
}
.card{
    max-height:18rem;
}
.card{
    overflow-y: auto;
}
.card-text{
    max-height: 5rem;
    
}
`
