import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./Screens/Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Nav/Home";
import Dashboard from "./Screens/Dashboard/Dashboard";
import MedForm from "./Screens/MedForm/MedForm";
import Registration from "./Screens/Registration/Registration";
import Products from "./Screens/Products/Products";
import Production from "./Screens/Production/Production";
import BuyMed from "./Screens/BuyMed/BuyMed";

function App() {
  const [user, setUser] = useState(null);
  const [loggedin, setLoggedin] = useState(false);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  useEffect(() => {
    if (user) {
      setLoggedin(true);
    }
  }, [user]);

  return (
    <div className="App">
      <Router>
        {loggedin && <Navbar />}
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/medForm" element={<MedForm />} />
          <Route path="/products" element={<Products />} />
          <Route path="/production/:_id" element={<Production />} />
          <Route path="/buyMed/:id" element={<BuyMed />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
