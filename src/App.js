import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/HomePage';
import Ask_AI from './Pages/ask-ai';
import Disease_Detection from './Pages/disease-detection';
import IoT from './Pages/IoT';
import Signin from './components/Auth/signin';
import Signup from './components/Auth/signup';
import { AuthContextProvider } from './context/AuthContext';
import './App.css';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/askai" element={<Ask_AI />} />
            <Route path="/diseasedetection" element={<Disease_Detection />} />
            <Route path="/IoT" element={<IoT />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
