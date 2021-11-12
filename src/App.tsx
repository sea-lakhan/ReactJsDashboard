import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserDashboard } from "./components/UserDashboard";
import { UserDetails } from "./components/UserDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserDashboard/>} />
        <Route path="/userDetails" element={<UserDetails/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
