import React from "react";
import './App.css';
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App: React.FC = () => {
    return(
        <Routes>
            <Route path="/" element={<Login />} />  
            <Route path="/register" element={<Register />} />  
        </Routes>
    );
}

export default App;