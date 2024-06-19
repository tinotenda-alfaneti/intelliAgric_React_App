import './App.css';
import React from 'react';
import Home from './pages/homePage';
import AgriNews from './pages/agriNews';
import IoTDevice from './pages/internetOfThings';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import { AuthContextProvider } from './context/authContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path='/agrinews'element={<AgriNews/>}/>
            {/* Testing the iot device page */}
            <Route path='/iotdevice'element={<IoTDevice/>}/>  
          </Routes>
        </div>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
