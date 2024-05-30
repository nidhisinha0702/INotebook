
import { useState, useContext } from "react";
import noteContext from "../context/notes/NoteContext"
const AddNotes = (props) => {
    
  const context= useContext(noteContext);
  const { addNote} = context;
  const [notes, setNotes] = useState({title: "",description: "" ,tag:""})
  const handleClick= (e)=>{
    e.preventDefault()
    addNote(notes.title, notes.description, notes.tag)
    setNotes({title: "",description: "" ,tag:""})
    props.showAlert("Added successfully","success")
  }
  const onChange= (e)=>{
    setNotes({...notes, [e.target.name]: e.target.value})
  }
  return (
       <div className="container my-3">
      <h1>Add a Note</h1>
      <form className="container my-3">
    <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name ="title" value={notes.title} aria-describedby="emailHelp" onChange={onChange} />
    </div>
    <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="description" name="description" value={notes.description} onChange={onChange}/>
    </div>
    <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="tag" name="tag" value={notes.tag} onChange={onChange}/>
    </div>
  <button type="submit" disabled={notes.title.length<5 || notes.description.length<5} className="btn btn-primary" onClick={handleClick}>Add Note</button>
</form>
</div>
  )
}

export default AddNotes
