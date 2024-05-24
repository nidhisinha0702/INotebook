import { useContext } from "react"
import noteContext from "../context/notes/NoteContext"
import NoteItem from "./NoteItem";

const Notes = () => {    
  const context= useContext(noteContext);
  const {notes, setNotes} = context;
  return (
    <div className="container my-3">
      <h1>You Notes</h1>
      {notes.map((notes)=>{
        return <NoteItem notes={notes}/>;
      })}
      </div>
  )
}

export default Notes
