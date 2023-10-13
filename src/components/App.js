import React from "react";
import HomePage from "./HomePage";
import EntryPage from "./EntryPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<HomePage />} />
                    <Route exact path="/auth" element={<EntryPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
