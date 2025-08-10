import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Portfolio from './Portfolio.jsx';
import Services from './Services.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </Router>
  );
}
