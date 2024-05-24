import React ,{useState} from "react";
import noteContext from "./NoteContext";

const NoteState = (props) =>{
    const notesInitial = [
        {
          "_id": "66509d29a36c0de9c297c298",
          "user": "664660ba54e8e7f76364417e",
          "title": "My title",
          "description": "Please wake up early",
          "tag": "personal",
          "date": "2024-05-24T13:59:05.036Z",
          "__v": 0
        }
      ]
      const [notes, setNotes] = useState(notesInitial)
    return (
        <noteContext.Provider value = {{notes, setNotes}} >
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;