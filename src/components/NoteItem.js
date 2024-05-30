

import { useContext } from "react";
import noteContext from "../context/notes/NoteContext"
const NoteItem = (props) => {
  const context = useContext(noteContext);
  const {deleteNote } = context;
   const {notes, updateNote} = props;
  return (
      <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
            <h5 className="card-title">{notes.title}</h5>
            <i className="fa-sharp fa-solid fa-trash mx-2" onClick={()=>{deleteNote(notes._id); props.showAlert("deleted successfully","success");}}></i>
            <i className="fa-solid fa-pen-to-square mx-2" onclick={()=>{updateNote(notes);props.showAlert("Updated successfully","success")}}></i>
        </div>
        <p className="card-text">{notes.description}</p>
        </div>
    </div>
  )
}

export default NoteItem
