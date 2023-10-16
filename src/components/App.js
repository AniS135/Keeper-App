import React from "react";
import HomePage from "./HomePage";
import EntryPage from "./EntryPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

const App = () => {
    return (
        <div className="App">
            <ChakraProvider>
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element={<HomePage />} />
                        <Route exact path="/auth" element={<EntryPage />} />
                    </Routes>
                </BrowserRouter>
            </ChakraProvider>
        </div>
    );
};

export default App;
