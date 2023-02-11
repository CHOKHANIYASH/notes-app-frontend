import React,{useEffect,useState} from 'react'
import axios from 'axios';
import styled from "styled-components"
import { useNavigate } from 'react-router-dom';
import searchIcon from "../images/search_FILL0_wght500_GRAD0_opsz48.svg"
import starFill from '../images/star-fill.svg'
import Star from '../images/star.svg'

export default function Starred() {
  const [starred,setStarred] = useState([])
  const [loading,setLoading] = useState(false)
  useEffect(()=>{
    axios.get('http://localhost:3000/notes/starred',{ withCredentials: true })
    .then((data)=>{
      setStarred(()=>data.data.starred)
    })
  },[])   
  
  function star(e){
    setLoading(true)
    axios.post(`http://localhost:3000/notes/${e.currentTarget.name}/starred`,{},{ withCredentials: true })
    .then(()=>{axios.get('http://localhost:3000/notes/starred',{ withCredentials: true })
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
          {/* <div className="add-new">
           <a href="/notes/new"><img src="/images/add_box_FILL0_wght400_GRAD0_opsz48.svg" alt=""/></a>  
          </div> */}
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
              <a className="btn btn-primary" href="/notes/<%= notes._id%>/edit" role="button">Edit</a>          
              <form className="d-inline" action="/notes/<%=notes._id%>/delete?_method=DELETE" method="POST">
                <button className="btn btn-danger">Delete</button>
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

