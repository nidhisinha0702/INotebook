import './App.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
import About from './components/About'
import {
  BrowserRouter as Router,Routes,
  Route} from "react-router-dom";
import NoteState from './context/notes/NoteState';
 
function App() {
  return (
    <>
    <NoteState>
    <Router>
      <NavBar />
      <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/about" element={<About />} />
      </Routes>
    </Router>
    </NoteState>
    </>
   
  );
}

export default App;
