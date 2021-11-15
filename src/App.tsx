import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserDashboard } from "./components/UserDashboard";
import { UserDetails } from "./components/UserDetails";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { Signup } from "./components/Signup";
import { Details } from "./components/Details";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

const useStyles = makeStyles({
  menuButton: {
    marginRight: 2,
  },
  title: {
    flexGrow: 1,
  },
});

function App() {
  const styles = useStyles();
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/confirmDetails" element={<Details />} />
        {/* <Route path="/" element={<UserDashboard />} /> */}
        <Route path="/userDashboard" element={<UserDashboard />} />
        <Route path="/userDetails" element={<UserDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
