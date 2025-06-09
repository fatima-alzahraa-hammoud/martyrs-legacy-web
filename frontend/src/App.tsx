import React from "react";
import './App.css';
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NavBar from "./pages/NavBar";
import MartyrsPage from "./pages/Martyrs Pages/MartyrsPage";
import InterviewsPage from "./pages/Martyrs Pages/Interviews";
import MartyrsStoriesPage from "./pages/Martyrs Pages/MartyrsStories";
import MartyrsWillsPage from "./pages/Martyrs Pages/MartyrsWills";
import MartyrPage from "./pages/Martyr Page/MartyrPage";
import MartyrWill from "./pages/Martyr Page/MartyrWill";
import MartyrStories from "./pages/Martyr Page/MartyrStories";

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
                <Route path="/martyr" element={<MartyrPage /> } />
                <Route path="/martyr/will" element={<MartyrWill /> } />
                <Route path="/martyr/stories" element={<MartyrStories /> } />
            </Routes>
        </div>
    );
}

export default App;