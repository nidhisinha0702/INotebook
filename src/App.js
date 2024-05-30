import './App.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
import About from './components/About'
import Alert from './components/Alert';
import {
  BrowserRouter as Router,Routes,
  Route} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
 
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert=(message, type)=>{
    setAlert({
      msg: message,
      type: type 
    })
   window.setTimeout=(()=>{
      setAlert(null);
    },1500);
  }

  return (
    <>
    <NoteState>
    <Router>
      <NavBar />
      <Alert alert={alert} />
      <div className="container">
      <Routes>
      <Route exact path="/" element={<Home showAlert={showAlert} />} />
      <Route exact path="/about" element={<About />} />
      <Route exact path="/login" element={<Login showAlert={showAlert} />} />
      <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
      </Routes>
      </div>
    </Router>
    </NoteState>
    </>
   
  );
}

export default App;
