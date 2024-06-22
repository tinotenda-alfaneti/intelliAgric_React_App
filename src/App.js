import './App.css';
import React from 'react';
import AgriNews from './pages/agriNews';
import Home from './pages/homePage';
import IoTDevice from './pages/internetOfThings';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import FarmDataForm from './pages/addFarm';
import DronePage from './pages/droneMainPage';
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
            <Route path='/agrinews'element={<AgriNews />}/>
            <Route path='/farmdataform'element={<FarmDataForm />}/>
            <Route path='/DronePage'element={<DronePage />}/>

          </Routes>
        </div>
      </Router>
    </AuthContextProvider>
  );
}

export default App;