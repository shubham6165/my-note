import React, {useEffect, useState, useContext} from 'react';
import '../navbar.css';
import logo from '../logo.png';
import noteContext from '../context/notes/noteContext';
import { Link, useLocation, useHistory } from 'react-router-dom';
require('dotenv').config();


const host= process.env.HOST;

export const Navbar = () => {
  let location = useLocation();
  const context = useContext(noteContext);
  let history = useHistory();

  // Get User Details
  const {getUser, deleteAccount} = context;
  const [user, setUser] = useState({name: "", email: ""})
   
  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/login');
  }
  useEffect(() => {
    getUser(setUser);
  }, [handleLogout])
  

  function handleDelete(){
  if (window.confirm("This will Permanently delete your account")) {
    deleteAccount();
    handleLogout();
  }
}


  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
      <Link to="/"><img src={logo} style={{height:"5rem", width:"5rem"}}/> </Link>
        <Link className="navbar-brand mx-2" to="/">myNote</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
            </li>
          </ul>
          {!localStorage.getItem('token') ? <form className="d-flex">
            <Link className="btn btn-success mx-2" role="button" to="/login">Login</Link>
            <Link className="btn btn-success mx-2" role="button" to="/signup">Sign Up</Link>
          </form> : <div>
          <i className="fa fa-user fs-3 mx-4 user-dropdown" aria-hidden="true">
            &nbsp; {user.name} &nbsp;
            <i class="fa fa-angle-down user-dropbtn"></i>
            <div className="user-dropcontent">
            <span>{user.email}</span>
            <span style={{cursor:"pointer"}} onClick={handleDelete}>Delete Account</span>
            </div>
            </i>
          <button className="btn btn-success" onClick={handleLogout}>Logout</button> </div>}
        </div>
      </div>
    </nav>
</>
  )
}
