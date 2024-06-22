import './App.css';
import React from 'react';
import AgriNews from './pages/agriNews';
import Home from './pages/homePage';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
// import FarmDataForm from './pages/addFarm';
import DronePage from './pages/droneMainPage';
import { AuthContextProvider } from './context/authContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewFarm from './pages/newFarm';
import FarmHomePage from './pages/farmHomePage';

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
            <Route path='/farmhome'element={<FarmHomePage />}/>
            <Route path='/myfarm'element={<NewFarm />}/>

          </Routes>
        </div>
      </Router>
    </AuthContextProvider>
  );
}

export default App;