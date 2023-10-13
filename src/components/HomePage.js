import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function HomePage() {
    const [notes, setNotes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("token");
        if (!user) navigate("/auth");
    }, [navigate]);

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

    return (
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
    );
}

export default HomePage;
