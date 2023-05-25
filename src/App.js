// import logo from './logo.svg';
import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Tondeuse from './components/Tondeuse';
import Quize from './components/Quize';
import Login from './components/Login';
import Navbar from './components/Navbar';
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* <Route exact path="/tondeuse" element={<Tondeuse />} /> */}
        <Route exact path="/first" element={<Quize />} />
        <Route exact path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
