import React ,{useState} from "react";
import noteContext from "./NoteContext";

const NoteState = (props) =>{
  const host = "http://localhost:3000"
    const notesInitial = []
     const [notes, setNotes] = useState(notesInitial)

      // Get all Notes
      const getNotes = async () =>{
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          }
        });
        const json = response.json()
        setNotes(json)
      }

      //Add a note
      const addNote = async (title, description, tag) =>{
        // eslint-disable-next-line
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
          body: JSON.stringify({title, description, tag})
        });
        const note = await response.json();
        setNotes(notes.concat(note))
      }
      //Delete a note
      const deleteNote = async (id) =>{
        //API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          }
        });
        const json = response.json();
        const newNotes = notes.filter((notes)=> {return notes._id !== id});
        setNotes(newNotes)
      }
      //Edit a note
      const editNote = async (id, title, description, tag) =>{
        //API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
          body: JSON.stringify({title, description,tag})
        });
        //const json = await response.json();

        let newNotes = JSON.parse(JSON.stringify(notes))
        for(let index = 0; index< notes.length; index++){
          const element = newNotes[index];
          if(element._id === id){
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
            break;
          }
        }
        setNotes(newNotes)
      }
    return (
        <noteContext.Provider value = {{notes, setNotes, addNote, deleteNote, editNote, getNotes}} >
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;