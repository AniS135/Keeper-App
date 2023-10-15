import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function HomePage() {
    const [notes, setNotes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const jwtToken = localStorage.getItem("jwtToken");
        if (!jwtToken) {
            navigate("/auth");
        }
        else {
            axios.get("http://localhost:8080/notes/v1/notes/get-all-notes", {
                headers : {
                    Authorization : `Bearer ${jwtToken}`
                }
            }).then(response => {
                console.log(response.data);
                setNotes(response.data);
            }).catch(error => {
                // console.error(error);
                localStorage.removeItem("jwtToken");
                navigate("/auth");
            });
        }
    }, [navigate]);

    function addNote(newNote) {

        const jwtToken = localStorage.getItem("jwtToken");

        axios.post("http://localhost:8080/notes/v1/notes/create-note", newNote,{
            headers : {
                Authorization : `Bearer ${jwtToken}`
            }
        }).then(response => {
            console.log(response.data);
            if(response.status === 200)
            {
                setNotes((prevNotes) => {
                    return [...prevNotes, response.data];
                });
            } 
        }).catch(error => {
            console.error(error);
        });

    }

    function deleteNote(id) {

        const jwtToken = localStorage.getItem("jwtToken");

        axios.delete(`http://localhost:8080/notes/v1/notes/delete-note/${id}`, {
            headers : {
                Authorization : `Bearer ${jwtToken}`
            }
        }).then(response => {
            console.log(response.data);
            if(response.status === 200)
            {
                setNotes((prevNotes) => {
                    return prevNotes.filter((noteItem) => {
                        return noteItem.id !== id;
                    });
                });
            } 
        }).catch(error => {
            console.error(error);
        });
    }

    return (
        <div className="main-container">
            <Header />
            <CreateArea onAdd={addNote} />
            <div className="NotesContainer">
                {notes.map((noteItem) => {
                    return (
                        <Note
                            key={noteItem.id}
                            id={noteItem.id}
                            title={noteItem.title}
                            content={noteItem.body}
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
