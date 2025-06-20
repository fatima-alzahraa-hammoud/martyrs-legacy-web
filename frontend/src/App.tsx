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
import MartyrInterviewsPage from "./pages/Martyr Page/MartyrInterviews";
import MartyrAlbumPage from "./pages/Martyr Page/MartyrAlbum";
import SayyedSpeeches from "./pages/Al-Sayed Hasan Pages/Speeches";
import AlSayyedStories from "./pages/Al-Sayed Hasan Pages/AlSayyedStories";
import AlSayyedAlbum from "./pages/Al-Sayed Hasan Pages/AlSayyedAlbum";
import AlSayyedInterviews from "./pages/Al-Sayed Hasan Pages/AlSayyedInterviews";
import AlSayyedHasanPage from "./pages/Al-Sayed Hasan Pages/AlSayyedHasanPage";

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
                <Route path="/martyr/:id" element={<MartyrPage /> } />
                <Route path="/martyr/:id/will" element={<MartyrWill /> } />
                <Route path="/martyr/:id/stories" element={<MartyrStories /> } />
                <Route path="/martyr/:id/interviews" element={<MartyrInterviewsPage /> } />
                <Route path="/martyr/:id/album" element={<MartyrAlbumPage /> } />
                <Route path="/al-sayed-hasan/speeches" element={<SayyedSpeeches /> } />
                <Route path="/al-sayed-hasan/stories" element={<AlSayyedStories /> } />
                <Route path="/al-sayed-hasan/album" element={<AlSayyedAlbum /> } />
                <Route path="/al-sayed-hasan/interviews" element={<AlSayyedInterviews /> } />
                <Route path="/al-sayed-hasan" element={<AlSayyedHasanPage/>} />
            </Routes>
        </div>
    );
}

export default App;