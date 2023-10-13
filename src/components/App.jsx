import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import LoginWrapper from "./Login";


function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (

    <div className="main-container">
      <LoginWrapper />
      <Header />
      <CreateArea onAdd={addNote} />
      <div className="NotesContainer">
        {notes.map((noteItem, index) => {
          return (
            <Note
              key={index}
              id={index}
              title={noteItem.title}
              content={noteItem.content}
              onDelete={deleteNote}
            />
          );
        })}
      </div>
      <Footer />
    </div>
  );
}

export default App;
