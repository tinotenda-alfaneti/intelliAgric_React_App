import './App.css';
import React from 'react';
import Home from './Pages/HomePage';
import AgriNews from './Pages/agriNews';
import Signin from './components/Auth/signin';
import Signup from './components/Auth/signup';
import FarmDataForm from './Pages/addFarm';
import { AuthContextProvider } from './context/AuthContext';
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
            <Route path='/farmdataform'element={<FarmDataForm/>}/>

          </Routes>
        </div>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
