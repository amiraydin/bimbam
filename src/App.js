// import logo from './logo.svg';
import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tondeuse from './components/Tondeuse';
import First from './components/First';
function App() {
  return (
    <BrowserRouter>
      <nav>
        <a href='tondeuse' >Tondeuse </a>
        <a href='first' style={{ marginLeft: "25px", background: "#fhfhfh" }}>First </a>
      </nav>
      <Routes>
        <Route exact path="/tondeuse" element={<Tondeuse />} />
        <Route exact path="/first" element={<First />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
