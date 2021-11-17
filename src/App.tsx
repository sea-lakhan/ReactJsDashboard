import "./App.css";
import { Routes, Route } from "react-router-dom";
import { UserDashboard } from "./components/UserDashboard";
import { UserDetails } from "./components/UserDetails";
import { Signup } from "./components/Signup";
import { Details } from "./components/Details";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<UserDashboard />} />
        <Route path="/addUser" element={<Signup />} />
        <Route path="/confirmDetails" element={<Details />} />
        <Route path="/userDetails" element={<UserDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
