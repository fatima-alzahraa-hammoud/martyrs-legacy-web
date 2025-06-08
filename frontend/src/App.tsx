import React from "react";
import './App.css';
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NavBar from "./pages/NavBar";
import MartyrsPage from "./pages/MartyrsPage";
import InterviewsPage from "./pages/InterviewsPage";


const App: React.FC = () => {
    return(
        <div className="App">
            <NavBar />
            <Routes>
                <Route path="/login" element={<Login />} />  
                <Route path="/register" element={<Register />} />  
                <Route path="/" element={<Home />} />  
                <Route path="/martyrs" element={<div>Martyrs Page</div>} />
                <Route path="/interviews" element={<InterviewsPage />} />

            </Routes>
        </div>
    );
}

export default App;