import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import EntryPage from "./Login";

function App() {
    const [notes, setNotes] = useState([]);
    const [isLoggedIn, setLoginStatus] = useState(false);

    useEffect(() => {
      const userData = localStorage.getItem('token');
      if(userData)
        setLoginStatus(true);
      else
        setLoginStatus(false);
    },[]);

    function addNote(newNote) {
        setNotes((prevNotes) => {
            return [...prevNotes, newNote];
        });
    }

    function deleteNote(id) {
        setNotes((prevNotes) => {
            return prevNotes.filter((noteItem, index) => {
                return index !== id;
            });
        });
    }

    return <>{
      isLoggedIn ? 
          <div className="main-container">
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
      : <EntryPage />
    }</>;
}

export default App;
