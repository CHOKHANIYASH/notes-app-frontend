import NavBar from './Components/NavBar';
import Login from './Components/Login';
import Home from './Components/Home';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './Components/PrivateRoute';
import Starred from './Components/Starred';
import Edit from './Components/Edit';
import New from './Components/New';
import Register from './Components/Register';
import Note from './Components/Note';
import { useStateProvider } from './Components/StateProvider';
function App() {
  const {message,errorMessage} = useStateProvider()
  return (
    <>
    <NavBar/>
    {message!=='' ?
          <div className="alert alert-success" role="alert">
          {message}
         </div>
      :
    errorMessage!=='' && 
          <div className="alert alert-danger" role="alert">
          {errorMessage}
         </div>
      }
    <Routes>  
    <Route exact path='/notes/home' element={<PrivateRoute/>}>
      <Route exact path='/notes/home' element={<Home/>}/>
    </Route>
    <Route exact path='/notes/starred' element={<PrivateRoute/>}>
      <Route exact path='/notes/starred' element={<Starred/>}/>
    </Route>
    <Route exact path='/notes/:id/edit' element={<PrivateRoute/>}>
      <Route path="/notes/:id/edit" element={<Edit/>} />
    </Route>
    <Route exact path='/notes/new' element={<PrivateRoute/>}>
      <Route path="/notes/new" element={<New/>} />
    </Route>
    <Route path="/notes/:id/home" element={<Note/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/register" element={<Register/>} />
    <Route exact path='*' element={<PrivateRoute/>}>
      <Route exact path='*' element={<Home/>}/>
    </Route>
    </Routes>
    </>
  );
}

export default App;
