import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Fab } from "@material-ui/core";
import Zoom from '@mui/material/Zoom';

function CreateArea(props) {
  const [zoomIn, setZoomIn] =useState(false);
  const [note, setNote] = useState({
    title: "",
    content: ""
  });


  function handleZoomInTrue(){
    setZoomIn(true);
  }
  // function handleZoomInFalse(){
  //   setZoomIn(false);
  // }

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();
  }

  return (
    <div>
      <form className="create-note">
        {zoomIn?
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />
        : null}
        <textarea
          name="content"
          onClick={handleZoomInTrue}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={zoomIn?"3":"1"}
        />
        <Zoom in={zoomIn}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
        
      </form>
    </div>
  );
}

export default CreateArea;
