import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar'
import Conversions from './Components/Conversions';

import ConversionRates from './Components/ConversionRates';




function App() {











  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/ConversionRates" element={<ConversionRates/>} />
        <Route path="/Conversions" element={<Conversions />} />
      </Routes>
    </Router>
  );

}

export default App
