import React from "react";
import './App.css';
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NavBar from "./pages/NavBar";
import MartyrsPage from "./pages/MartyrsPage";
import InterviewsPage from "./pages/InterviewsPage";
import MartyrsStoriesPage from "./pages/MartyrsStoriesPage";
import MartyrsWillsPage from "./pages/MartyrsWillsPage";


const App: React.FC = () => {
    return(
        <div className="App">
            <NavBar />
            <Routes>
                <Route path="/login" element={<Login />} />  
                <Route path="/register" element={<Register />} />  
                <Route path="/" element={<Home />} />  
                <Route path="/martyrs" element={<MartyrsPage />} />
                <Route path="/interviews" element={<InterviewsPage />} />
                <Route path="/stories" element={<MartyrsStoriesPage />} />
                <Route path="/wills" element={<MartyrsWillsPage />} />
            </Routes>
        </div>
    );
}

export default App;