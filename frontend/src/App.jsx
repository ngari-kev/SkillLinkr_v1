import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthWrapper from "./components/AuthWrapper";
import Chat from "./components/Chat";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Marketplace from "./components/pages/Marketplace";
import Profile from "./components/pages/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/profile"
          element={
            <AuthWrapper>
              <Profile />
            </AuthWrapper>
          }
        />
        <Route
          path="/marketplace"
          element={
            <AuthWrapper>
              <Marketplace />
            </AuthWrapper>
          }
        />
        <Route
          path="/chat"
          element={
            <AuthWrapper>
              <Chat />
            </AuthWrapper>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
