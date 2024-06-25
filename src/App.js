import './App.css';
import React from 'react';
import AgriNews from './pages/agriNews';
import Home from './pages/homePage';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import { AuthContextProvider } from './context/authContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewFarm from './pages/newFarm';
import FarmHomePage from './pages/farmHomePage';
import { FarmProvider } from './context/farmContext';
import IoT from './pages/internetOfThings';
import DronePage from './pages/droneMainPage';
import { IoTProvider } from './context/iotContext';


function App() {
  return (
    <AuthContextProvider>
      <FarmProvider>
        <IoTProvider>
          <Router>
            <div className="App">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path='/agrinews'element={<AgriNews />}/>
                <Route path='/farmhome'element={<FarmHomePage />}/>
                <Route path='/myfarm'element={<NewFarm />}/>
                <Route path='/drone' element={<DronePage />}/>
                <Route path='/farmhome/iot' element={<IoT />}/> 
          

              </Routes>
            </div>
          </Router>
        </ IoTProvider>
      </FarmProvider>
    </AuthContextProvider>
  );
}

export default App;