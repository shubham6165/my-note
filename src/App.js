import './App.css';
import React, { useState } from 'react';
import {
BrowserRouter as Router,
Switch,
Route
} from "react-router-dom";
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import {About} from './components/About';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Alert from './components/Alert';
import NoteState from './context/notes/NoteState';
import Foooter from './components/Footer';

function App() {

  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(()=>{
      setAlert(null);
    }, 1500);
  }

return (
<>
  <NoteState>
    <Router>
      <div  style={{minHeight:"100%", position:"relative"}}>
      <Navbar />
      <Alert alert = {alert}/>
      <div className="container" style={{marginBottom:'5rem'}}>
        <Switch>
          <Route exact path="/">
            <Home showAlert={showAlert}/>
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/login">
            <Login showAlert={showAlert}/>
          </Route>
          <Route exact path="/signup">
            <SignUp showAlert={showAlert}/>
          </Route>
        </Switch>
      </div>
      <Foooter/>
      </div>
    </Router>
  </NoteState>
</>
);
}

export default App;