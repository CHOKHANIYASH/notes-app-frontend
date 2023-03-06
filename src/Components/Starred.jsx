import React,{useEffect,useState} from 'react'
import axios from 'axios';
import styled from "styled-components"
import searchIcon from "../images/search_FILL0_wght500_GRAD0_opsz48.svg"
import starFill from '../images/star-fill.svg'
import { useStateProvider } from './StateProvider';
export default function Starred() {
  const {updateMessage} = useStateProvider()
  const [starred,setStarred] = useState([])
  const [loading,setLoading] = useState(false)
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_SERVER_ID}/notes/starred`,{ withCredentials: true })
    .then((data)=>{
      setStarred(()=>data.data.starred)
    })
  },[])   
  async function handleDelete(e){
    e.preventDefault()
    const id = e.target.name
    await axios.delete(`${process.env.REACT_APP_SERVER_ID}/notes/${id}/delete`,{ withCredentials: true })
    .then((response)=>{
      updateMessage(response.data.message)
      axios.get(`${process.env.REACT_APP_SERVER_ID}/notes/starred`,{ withCredentials: true })
    .then((data)=>{
      setStarred(()=>data.data.starred)
    })
    })
  }
  function star(e){
    setLoading(true)
    axios.post(`${process.env.REACT_APP_SERVER_ID}/notes/${e.currentTarget.name}/starred`,{},{ withCredentials: true })
    .then(()=>{axios.get(`${process.env.REACT_APP_SERVER_ID}/notes/starred`,{ withCredentials: true })
    .then((data)=>{
      setStarred(()=>data.data.starred)
      setLoading(false)
    })
  })
  }

  return (
    <>
        <Container>

         <div className="d-flex justify-content-between">
          <div className="list-no">
             <h2> {starred.length } </h2>
          </div>
        </div>

        <div className="container-fluid col-sm-6 d-flex justify-content-center " >
          <div className="input-group mb-3 " >
            <input type="text" className="form-control" id="searchTxt" placeholder="Search your list" aria-label="search-list" aria-describedby="basic-addon2" />
            <span className="input-group-text" id="basic-addon2"><img src={searchIcon} alt="" style={{width:"  2vw"}}/>
            </span>
          </div>
        </div>

     

        <div className=" row row-cols-auto ">
      {    starred.map((notes) => 
          (
          <div className="col" key={notes._id} >
          <div className="card " style={{width: "18rem"}} >
            <div className="card-body">
              <div className="d-flex justify-content-between">
              <h5 className="card-title inline">{notes.title}  </h5>
              <button style={{background:'none',border:'none',}} disabled={loading}  onClick={star} name={notes._id}><img  src={starFill} alt="star-filled" className="star"/></button>               
            </div>
              <h6 className="card-subtitle mb-2 text-muted">{ notes.subtitle } </h6>
              <p className="card-text overflow-auto">{notes.description } </p>
              <a className="btn btn-primary m-1" href={`/notes/${notes._id}/edit`} role="button">Edit</a>          
              <form className="d-inline" onSubmit={handleDelete} name={notes._id}>
                <button type="submit" className="btn btn-danger" >Delete</button>
              </form>             
            
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
/*.card{
    overflow-y: scroll;
    overflow-anchor: ;
}*/
.card-text{
    max-height: 5rem;
    
}
`

