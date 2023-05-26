// import logo from './logo.svg';
import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Tondeuse from './components/Tondeuse';
import Quize from './components/Quize';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Home from './components/Home';
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* <Route exact path="/tondeuse" element={<Tondeuse />} /> */}
        <Route exact path="/question" element={<Quize />} />
        <Route exact path="/" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
